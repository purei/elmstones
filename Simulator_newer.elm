port module Simulator exposing (BattleMsg(..), Model, Msg(..), Position, Stats, addToHand, awaitChoice, continueBattle, currentState, defensiveLine, disconnectHead, disconnectPos, emptyStats, getFixedDeck, getRandomDeck, getState, handSize, init, initStats, isActive, isAlive, lineFilter, lineMap, main, matchRandomize, maxTurns, maybeDrawCard, maybeEndBattle, maybeMelee, maybePlay, maybeReport, maybeStartMelee, melee, newMatchup, offensiveLine, play, playCard, reduceDelay, removeDead, report, requisition, setupBattle, setupDecks, simOrder, subs, takeSides, update, updateStats, updateTurn)

import Array
import Json.Decode
import List.Extra as Lex
import Random
import Random.Pcg
import Randomize
import Types exposing (..)


type Msg
    = NewSim Requisition
    | Match
    | Setup ( List UnitData, List UnitData )
    | GetState Int
    | Battle BattleMsg


type BattleMsg
    = TakeSides
    | ReduceDelay
    | Draw
    | AwaitChoice
    | Play Position
    | Melee Position
    | RemoveDead
    | EndBattle


type alias Model =
    { battle : Battle
    , matchup : Matchup
    , stats : Stats
    }


type alias Stats =
    { repeats : Int
    , wins : Int
    , attempts : Int
    }


emptyStats =
    Stats 0 0 0


initStats repeats =
    Stats repeats 0 0


type alias Position =
    Int


handSize =
    3


maxTurns =
    100


update msg model =
    case msg of
        -- Start a battle from a matchup
        NewSim ( matchup, repeats ) ->
            simOrder matchup repeats

        Match ->
            newMatchup model

        Setup ( att, def ) ->
            setupDecks ( att, def ) model

        GetState _ ->
            ( model, currentState model.battle )

        Battle battle_msg ->
            case battle_msg of
                -- these are battle messages we need to deal w/ at the parent
                AwaitChoice ->
                    ( model, awaitChoice { battle = model.battle, matchup = model.matchup } )

                -- need the whole fight, thus the model
                EndBattle ->
                    updateStats model => maybeReport

                -- need the model to keep stats
                _ ->
                    continueBattle battle_msg model


updateStats model =
    let
        stats =
            model.stats

        win =
            case side model.battle of
                Attacker ->
                    1

                Defender ->
                    0
    in
    { model
        | stats =
            { stats
                | wins = stats.wins + win
                , attempts = stats.attempts + 1
            }
    }


continueBattle msg model =
    let
        ( battle_, cmd ) =
            updateTurn msg model.battle
    in
    ( { model | battle = battle_ }, Cmd.map Battle cmd )


maybeReport model =
    let
        stats =
            model.stats
    in
    if stats.attempts < stats.repeats then
        goto Match

    else
        report (Report model.matchup stats.wins stats.attempts)



-------------------------------------------------------------------------------------


(=>) a f =
    ( a, f a )


(>>>) f a x =
    f x => a


updateTurn msg battle =
    battle
        |> (case msg of
                -- Next 7 update states are 'one turn' in a battle
                TakeSides ->
                    takeSides

                ReduceDelay ->
                    offensiveLine reduceDelay >>> maybeDrawCard

                Draw ->
                    addToHand >>> maybeDrawCard

                Play pos ->
                    playCard pos >>> maybeStartMelee

                Melee pos ->
                    melee pos

                -- this continues Meleeing. FIXME?
                RemoveDead ->
                    removeDead >>> maybeEndBattle

                _ ->
                    Debug.crash "should've been taken care of upstream"
           )


lineFilter filter side =
    { side | line = Array.filter filter side.line }


lineMap map side =
    { side | line = Array.map map side.line }


offensiveLine fn battle =
    { battle | offense = lineMap fn battle.offense }


defensiveLine fn battle =
    { battle | defense = lineMap fn battle.defense }



--goto x = Task.perform identity (Task.succeed x)


reduceDelay unit =
    { unit | countdown = unit.countdown - 1 }


isAlive unit =
    unit.damage_taken < unit.base.health


isActive unit =
    unit.countdown <= 0


disconnectHead list =
    case list of
        [] ->
            Debug.crash "not allowed"

        [ head ] ->
            ( head, [] )

        head :: rest ->
            ( head, rest )


disconnectPos pos list =
    let
        ( front, back ) =
            Lex.splitAt pos list

        ( card, back_ ) =
            disconnectHead back
    in
    ( card, front ++ back_ )


getRandomDeck competitor =
    let
        ( _, tail ) =
            Lex.splitAt competitor.dealer competitor.player.deck
    in
    tail


getFixedDeck competitor =
    let
        ( head, _ ) =
            Lex.splitAt competitor.dealer competitor.player.deck
    in
    head


matchRandomize model =
    let
        att =
            Randomize.shuffle <| getRandomDeck model.matchup.attacker

        def =
            Randomize.shuffle <| getRandomDeck model.matchup.defender
    in
    Random.Pcg.generate Setup <| Random.Pcg.pair att def


{-| New order, empty the battle and stats
-}
simOrder matchup repeats =
    let
        model =
            { battle = emptyBattle, matchup = matchup, stats = initStats repeats }
    in
    ( model
    , matchRandomize model
    )


newMatchup model =
    ( model, matchRandomize model )


setupDecks decks model =
    ( { model | battle = setupBattle decks model.matchup }, goto (Battle TakeSides) )


setupBattle ( att, def ) matchup =
    let
        attacker =
            matchup.attacker

        defender =
            matchup.defender
    in
    { offense = initArmy attacker.player (getFixedDeck attacker ++ att)
    , defense = initArmy defender.player (getFixedDeck defender ++ def)
    , turn = 0
    }



----------------------------------------------------------------------------------------
--BATTLE


takeSides battle =
    let
        battle_ =
            { battle | turn = battle.turn + 1 }
    in
    if battle_.turn == 1 then
        ( battle_, goto ReduceDelay )

    else
        ( { battle_ | offense = battle.defense, defense = battle.offense }, goto ReduceDelay )


addToHand battle =
    let
        offense =
            battle.offense

        ( hand, deck_ ) =
            disconnectHead offense.deck

        hand_ =
            offense.hand ++ [ hand ]
    in
    { battle | offense = { offense | hand = hand_, deck = deck_ } }


playCard pos battle =
    let
        offense =
            battle.offense

        ( card, hand_ ) =
            disconnectPos pos offense.hand

        line_len =
            Array.length offense.line

        offense_ =
            { offense
                | line = Array.push (initUnit card) offense.line
                , hand = hand_
            }
    in
    { battle | offense = offense_ }



--Melee -- This is big departure from 'maybe', hopefully for efficiency


melee pos battle =
    let
        maybeMeleeNext =
            maybeMelee (pos + 1)

        off =
            Array.get pos battle.offense.line
    in
    case off of
        Nothing ->
            ( battle, goto RemoveDead )

        Just off_unit ->
            let
                attack =
                    off_unit.base.attack

                defense =
                    battle.defense

                def =
                    Array.get pos defense.line

                reduceHealth amt unit =
                    { unit | damage_taken = unit.damage_taken + amt }
            in
            if isAlive off_unit && isActive off_unit then
                case def of
                    Nothing ->
                        let
                            reducedHealthComm =
                                reduceHealth attack defense.commander

                            battle_ =
                                { battle | defense = { defense | commander = reducedHealthComm } }
                        in
                        if isAlive reducedHealthComm then
                            battle_ => maybeMeleeNext

                        else
                            ( battle_, goto EndBattle )

                    Just def_unit ->
                        let
                            reducedHealthUnit =
                                reduceHealth attack def_unit

                            def_ =
                                { defense | line = Array.set pos reducedHealthUnit defense.line }
                        in
                        { battle | defense = def_ } => maybeMeleeNext

            else
                battle => maybeMeleeNext


removeDead battle =
    { battle
        | offense = lineFilter isAlive battle.offense
        , defense = lineFilter isAlive battle.defense
    }



---------------------------------------------------------------------------------------------
-- maybe* outputs Cmd Msg


maybeDrawCard battle =
    let
        offense =
            battle.offense

        hand_len =
            List.length offense.hand

        deck_len =
            List.length offense.deck

        needCard =
            hand_len < handSize

        cardAvailable =
            deck_len > 0
    in
    if needCard && cardAvailable then
        goto Draw

    else
        maybePlay battle


maybePlay battle =
    let
        hand_len =
            List.length battle.offense.hand

        cardChoice =
            hand_len > 1

        anyCards =
            hand_len > 0
    in
    if cardChoice then
        goto AwaitChoice

    else if anyCards then
        goto (Play 0)

    else
        maybeStartMelee battle


maybeStartMelee =
    maybeMelee 0


maybeMelee pos battle =
    let
        line_len =
            Array.length battle.offense.line
    in
    if line_len > pos then
        goto (Melee pos)

    else
        goto RemoveDead


maybeEndBattle battle =
    if battle.turn == maxTurns then
        goto EndBattle

    else
        goto TakeSides



------------------------------------------------------------------------------


init =
    ( Model emptyBattle emptyMatchup emptyStats, Cmd.none )


main =
    Platform.program { init = init, update = update, subscriptions = subs }


subs model =
    Sub.batch [ play (Battle << Play), getState GetState, requisition NewSim ]



--OUT


port currentState : Battle -> Cmd msg


port awaitChoice :
    Fight
    -> Cmd msg --port for sending battle out, also waiting for a card play


port report : Report -> Cmd msg



--IN


port play :
    (Position -> msg)
    -> Sub msg --port for listening for plays from JavaScript


port requisition : (Requisition -> msg) -> Sub msg


port getState : (Int -> msg) -> Sub msg



------------------------------------------------------------------------------
--remove n arr = Array.append (Array.slice 0 n arr) (Array.slice (n+1) (Array.length arr) arr)
