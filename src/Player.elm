module Player exposing
    ( Config
    , Play(..)
    , Player
    , army
    , canDraw
    , canPlay
    , clearDead
    , damageHero
    , damageUnit
    , dealer
    , deck
    , decoder
    , drawCard
    , getDraw
    , getPlay
    , hand
    , handSize
    , hero
    , heroBase
    , heroIsAlive
    , init
    , playCard
    , reduceDelay
    , strategy
    , unit
    , units
    )

import Battle.Army as Army exposing (Army)
import Data exposing (Card, Cards)
import Deck exposing (Deck)
import Hand exposing (Hand)
import Hero
import Json.Decode exposing (Decoder, andThen, field, map, oneOf, string, succeed)
import Json.Decode.Pipeline exposing (custom, optional, required)
import Random.Pcg.Extended as Random
import Strategy exposing (Strategy)
import Strategy.Config
import Unit exposing (Unit)


handSize =
    3


type alias Config =
    { hero : Data.Hero
    , dealer : Deck.Config -- your deck, and how it is given to you
    , strategy : Strategy.Config

    --  , hand: Hand.Config -- fixed at 3 for now
    }


type alias Context =
    { hand : Hand
    , deck : Deck
    , army : Army -- Hero and Units in the field
    , strategy : Strategy -- how player plays their hand
    }


type alias Player =
    { config : Config
    , context : Context
    }


retrieveCards : Decoder Cards
retrieveCards =
    field "dealer" Deck.decoder |> map Deck.cards


decodeStrategy : Decoder Strategy.Config
decodeStrategy =
    oneOf
        [ retrieveCards |> andThen (field "strategy" << Strategy.Config.decoder)
        , Json.Decode.succeed Strategy.Config.defaultDecoder
        ]


decoder : Decoder Config
decoder =
    succeed Config
        |> required "hero"
            (oneOf
                [ Data.heroDecoder
                , string |> andThen Data.stringHeroDecoder
                ]
            )
        |> required "dealer" Deck.decoder
        |> custom decodeStrategy


heroBase player =
    player.config.hero


dealer player =
    player.config.dealer


hand player =
    Hand.cards player.context.hand


deck player =
    Deck.remaining player.context.deck


hero player =
    Army.hero player.context.army


units player =
    Army.units player.context.army


army player =
    player.context.army


strategy player =
    player.context.strategy


apply : (Context -> Context) -> Player -> Player
apply applyFunction player =
    { player | context = applyFunction player.context }


applyArmy : (Army -> Army) -> Player -> Player
applyArmy armyFunction =
    apply (\context -> { context | army = armyFunction context.army })



-- getters


unit : Int -> Player -> Maybe Unit
unit pos player =
    Army.unit pos player.context.army


report : Player -> ( Army, List Card, List Card )
report player =
    ( army player, deck player, hand player )



-- handLeft player = List.length (hand player)


canDraw player =
    needCard player && cardAvail player


needCard player =
    handSize > Hand.size player.context.hand



-- FIXME duplicate


cardAvail player =
    Deck.size player.context.deck > 0


canPlay player =
    Hand.size player.context.hand > 0



-- hasCardChoice player = handLeft player > 1
-- hasFighter pos player = numUnits player > pos -- pos 0-indexed


heroIsAlive player =
    Hero.isAlive (hero player)



------------
-- setters


clearDead : Player -> Player
clearDead =
    applyArmy <|
        Army.clearDead


reduceDelay : Player -> Player
reduceDelay =
    applyArmy <|
        Army.applyUnits <|
            Unit.reduceDelay


damageHero : Int -> Player -> Player
damageHero amt =
    applyArmy <|
        Army.applyHero <|
            Hero.damage amt


damageUnit : Int -> Int -> Player -> Player
damageUnit pos amt =
    applyArmy <|
        Army.applyUnit pos <|
            Unit.damage amt


addToHand : Card -> Context -> Context
addToHand card context =
    { context | hand = Hand.add card context.hand }


setDeck : Deck -> Context -> Context
setDeck deck_ context =
    { context | deck = deck_ }


setHand : Cards -> Context -> Context
setHand hand_ context =
    { context | hand = Hand.set context.hand hand_ }


setStrategy : Strategy -> Context -> Context
setStrategy strat context =
    { context | strategy = strat }



------------------------------------------


getDraw : Player -> ( Maybe Card, Cards )
getDraw player =
    Deck.deal (deck player)


drawCard : ( Card, Cards ) -> Player -> Player
drawCard ( card, deck_ ) =
    apply (addToHand card)
        >> apply (setDeck deck_)


type Play
    = External Card -- must confirm that it is in the player's hand
    | Internal Card -- already removed from the hand, can play immediately


{-| play a card as a unit on the battlefield
-}
playCard : Card -> Int -> Player -> Player
playCard card id =
    applyArmy <|
        Army.addUnit card id


{-| knowing who is on offense, on defense and the turn, we decide what to play
-}
getPlay : Player -> Player -> Int -> ( Player, Maybe Play )
getPlay offense defense turn =
    let
        ( possible_card, hand_, new_strat ) =
            Strategy.play (strategy offense) (report offense) (report defense) turn
    in
    case possible_card of
        Nothing ->
            ( offense, Nothing )

        Just card ->
            ( offense
                |> apply (setHand hand_)
                |> apply (setStrategy new_strat)
            , Just (Internal card)
            )


init : Config -> ( Random.Seed, Random.Seed ) -> Player
init config ( seedDeck, seedStrategy ) =
    { config = config
    , context =
        Context
            Hand.init
            (Deck.prepare seedDeck config.dealer)
            (Army.init config.hero)
            (Strategy.prepare seedStrategy config.strategy (Deck.cards config.dealer))
    }
