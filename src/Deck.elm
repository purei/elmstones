module Deck exposing
    ( Config
    , Deck
    , Generator
    , cards
    , deal
    , decoder
    , generator
    , prepare
    , remaining
    , size
    )

import Data exposing (Card, Cards)
import Deck.Partial as Partial
import Deck.Shuffle as Shuffle
import Deck.Stacked as Stacked
import Json.Decode exposing (Decoder, fail, map, null, oneOf)
import Random.Pcg.Extended as Random


type Config
    = Stacked Stacked.Config
    | Shuffle Shuffle.Config
    | Partial Partial.Config


type alias Generator =
    Random.Generator Cards


type alias Deck =
    Cards


generator : Config -> Random.Generator Cards
generator config =
    case config of
        Stacked config_ ->
            Stacked.generator config_

        Shuffle config_ ->
            Shuffle.generator config_

        Partial config_ ->
            Partial.generator config_


emptyDeck : Deck
emptyDeck =
    []


decoder : Decoder Config
decoder =
    oneOf
        [ map Shuffle Shuffle.decoder -- try shuffle first, as stacked json is a subset of shuffle
        , map Stacked Stacked.decoder
        , map Partial Partial.decoder
        , fail "Dealer couldn't match."
        ]


prepare : Random.Seed -> Config -> Deck
prepare seed config =
    let
        ( random_cards, _ ) =
            Random.step (generator config) seed
    in
    random_cards


cards : Config -> Cards
cards config =
    case config of
        Stacked config_ ->
            Stacked.cards config_

        Shuffle config_ ->
            Shuffle.cards config_

        Partial config_ ->
            Partial.cards config_


deal : Deck -> ( Maybe Card, Deck )
deal deck =
    case deck of
        [] ->
            ( Nothing, deck )

        card :: remaining_cards ->
            ( Just card, remaining_cards )


remaining : Deck -> Cards
remaining =
    identity


size : Deck -> Int
size =
    List.length
