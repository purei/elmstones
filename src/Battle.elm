module Battle exposing
    ( Config
    , Context
    , ExternalMsg(..)
    , Log
    , Msg
    , Seeds
    , attackerWon
    , init
    , matchupDecoder
    , seedsGenerator
    , update
    )

import Battle.Army as Army
import Battle.Log as Log exposing (Event, Log)
import Battle.Report as Report
import Data exposing (Card, Cards)
import Hero
import Json.Decode exposing (Decoder, succeed)
import Json.Decode.Pipeline exposing (required)
import Player exposing (Play, Player, init)
import Random.Pcg.Extended as Random
import Task
import Unit exposing (Unit)


goto x =
    Task.perform identity (Task.succeed x)


maxTurns =
    100


type alias Config =
    { attacker : Player.Config
    , defender : Player.Config
    }


matchupDecoder : Decoder Config
matchupDecoder =
    succeed Config
        |> required "attacker" Player.decoder
        |> required "defender" Player.decoder


type alias Context =
    { offense : Player
    , defense : Player
    , turn : Int
    , seed : Random.Seed
    , log : Log
    }


type alias Battle =
    Context


type alias Model =
    Context


type Msg
    = StartTurn
    | Play Card -- input from a port


type ExternalMsg
    = EndBattle
    | NoOp


type alias Update =
    ( Model, Cmd Msg, ExternalMsg )


type alias Log =
    Log.Log


update : Msg -> Model -> Update
update msg model =
    model
        |> (case msg of
                StartTurn ->
                    incrementTurn
                        >> swapSides
                        >> reduceUnitDelay
                        >> maybeDraw

                Play play ->
                    playCard ( model.offense, Just (Player.External play) )
                        >> maybeStartAttack
           )


type alias Seeds =
    ( Random.Seed, ( Random.Seed, Random.Seed ), ( Random.Seed, Random.Seed ) )



{- generate separate seeds, I may want to save/evolve them independently -}


seedsGenerator : Random.Generator Seeds
seedsGenerator =
    let
        seedGen =
            Random.independentSeed

        pair =
            Random.pair seedGen seedGen
    in
    Random.map3 (\a b c -> ( a, b, c )) seedGen pair pair


{-| we place the attacker / defender backwards: at the beginning of turn 1,
we swap them into the right positions.
-}
init : Config -> Seeds -> ( Model, Cmd Msg )
init { attacker, defender } ( seed, attSeeds, defSeeds ) =
    let
        init_model =
            Context
                (Player.init defender attSeeds)
                (Player.init attacker defSeeds)
                0
                seed
                []

        -- _ =
        --     Debug.log "k" init_model
    in
    ( init_model, goto StartTurn )


{-| hacky? FIXME
-}
attackerWon : Battle -> Bool
attackerWon battle =
    remainderBy 2 battle.turn == 1



----------------------------------------------------------------------------
-- maybe : (Battle -> Bool) -> (Battle -> Battle) -> Battle -> Update
-- maybe bool_fn fn x = if bool_fn x then fn x else x


maybePlayCard _ model =
    ( model, Cmd.none )


emit c ( a, b ) =
    ( a, b, c )


{-| if the offensive player can draw a card, draw it
otherwise, try to play a card
-}



-- draw : Battle -> Update
-- draw battle =
--     let
--         ( new_player, drew_card ) =
--             Player.draw battle.offense
--
--         new_battle =
--             { battle | offense = new_player }
--     in
--         case drew_card of
--             Nothing ->
--                 Debug.crash "fail"
--
--             Just card ->
--                 new_battle
--                     |> logEvent (Log.DrawCard card)
--                     |> maybeDraw


maybeDraw : Battle -> Update
maybeDraw battle =
    battle
        |> (if onOffense Player.canDraw battle then
                drawCard (onOffense Player.getDraw battle)
                    >> maybeDraw

            else
                maybePlay
                    >> maybeStartAttack
           )


{-| if the offensive player can play a card, play it
otherwise, try to start attacking
-}
maybePlay : Battle -> Battle
maybePlay battle =
    battle
        |> (if onOffense Player.canPlay battle then
                playCard (Player.getPlay battle.offense battle.defense battle.turn)

            else
                identity
           )


maybeStartAttack =
    maybeAttack 0


{-| get the attacking unit at the given position:
either you found no attacker, then there are no more attackers, end the turn
or you found an attacker:
either they can attack, then melee
or they can't, give the next unit in line a chance to attack
-}
maybeAttack : Int -> Battle -> Update
maybeAttack position battle =
    battle
        |> (case getAttackerAt position battle of
                Nothing ->
                    endTurn

                Just attacker ->
                    if allOf [ Unit.isAlive, Unit.isActive ] attacker then
                        melee ( position, attacker )

                    else
                        maybeAttack (position + 1)
           )


drawCard : ( Maybe Card, Cards ) -> Battle -> Battle
drawCard ( possibleCard, deck ) battle =
    battle
        |> (case possibleCard of
                Just card ->
                    applyOffense (Player.drawCard ( card, deck ))
                        >> logEvent (Log.DrawCard card)

                Nothing ->
                    identity
           )


playCard : ( Player, Maybe Player.Play ) -> Battle -> Battle
playCard ( new_player, play ) battle =
    case play of
        Just playPlayer ->
            let
                ( card, play_fn ) =
                    case playPlayer of
                        -- FIXME  play.external made more sense.
                        Player.External card_ ->
                            --let
                            --    _ =
                            --        Debug.log "whyyy" card_
                            --in
                            ( card_, \x -> x )

                        Player.Internal card_ ->
                            ( card_, Player.playCard card_ battle.turn )
            in
            { battle | offense = new_player }
                |> applyOffense play_fn
                |> logEvent (Log.PlayCard card)

        Nothing ->
            battle


{-| get the defending unit at the given position:
either you found no defender, hit the commander.
or you found a defender:
either they're alive, hit it
or they're not, hit the commander
-}
melee : ( Int, Unit ) -> Battle -> Update
melee ( position, attacker ) battle =
    battle
        |> (case getDefenderAt position battle of
                Nothing ->
                    hitHero ( position, attacker )

                Just defender ->
                    if Unit.isAlive defender then
                        hitUnit ( position, attacker )

                    else
                        hitHero ( position, attacker )
           )


{-| hit the defending commander
if you killed them, end the battle
-}
hitHero : ( Int, Unit ) -> Battle -> Update
hitHero ( position, attacker ) battle =
    let
        amount =
            getDamage attacker
    in
    if amount > 0 then
        -- don't log if no attack happens
        let
            battle_after_damage =
                setDefense (Player.damageHero amount) battle
        in
        battle_after_damage
            |> logEvent (Log.HeroDamage amount)
            |> (if onDefense Player.heroIsAlive battle_after_damage then
                    maybeAttack (position + 1)

                else
                    endBattle
               )

    else
        battle
            |> maybeAttack (position + 1)


{-| get the damage that will be done and damage the unit at the positions,
log the event,
give the next unit in line a chance to attack
-}
hitUnit : ( Int, Unit ) -> Battle -> Update
hitUnit ( position, attacker ) battle =
    let
        amount =
            getDamage attacker
    in
    if amount > 0 then
        let
            after_damage =
                setDefense (Player.damageUnit position amount) battle
        in
        after_damage
            |> logEvent (Log.AttackDamage amount)
            |> maybeAttack (position + 1)

    else
        battle |> maybeAttack (position + 1)


endTurn : Battle -> Update
endTurn battle =
    battle
        |> clearDead
        |> (if battle.turn >= maxTurns then
                endBattle

            else
                newTurn
           )


newTurn : Battle -> Update
newTurn battle =
    ( battle, goto StartTurn, NoOp )


endBattle : Battle -> Update
endBattle battle =
    ( battle, Cmd.none, EndBattle )



-------------------
-- Helpers


getDamage attacker =
    Unit.attack attacker


anyOf list target =
    List.foldl (\f a -> f target || a) False list


allOf list target =
    List.foldl (\f a -> f target && a) True list


getDefenderAt pos battle =
    Player.unit pos battle.defense


getAttackerAt pos battle =
    Player.unit pos battle.offense


setDefense setFunction battle =
    { battle | defense = setFunction battle.defense }


onDefense onFunction battle =
    onFunction battle.defense


onOffense onFunction battle =
    onFunction battle.offense


applyOffense : (Player -> Player) -> Context -> Context
applyOffense fn battle =
    { battle | offense = fn battle.offense }


logEvent log battle =
    { battle
        | log = log :: battle.log
    }



--------------
-- Mutators


incrementTurn : Battle -> Battle
incrementTurn battle =
    { battle
        | turn = battle.turn + 1
    }
        |> logEvent (Log.IncrementTurn (battle.turn + 1))


swapSides : Battle -> Battle
swapSides battle =
    { battle
        | offense = battle.defense
        , defense = battle.offense
    }


reduceUnitDelay : Battle -> Battle
reduceUnitDelay battle =
    { battle
        | offense = Player.reduceDelay battle.offense
    }
        |> logEvent Log.ReduceDelay


clearDead : Battle -> Battle
clearDead battle =
    { battle
        | defense = Player.clearDead battle.defense
    }
        |> logEvent Log.ClearDead
