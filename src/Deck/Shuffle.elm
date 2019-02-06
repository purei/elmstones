module Deck.Shuffle exposing (Config, cards, decoder, generator)

import Data exposing (Cards)
import Json.Decode exposing (Decoder, int, maybe, succeed)
import Json.Decode.Pipeline exposing (required)
import Random.Extra as Randomize
import Random.Pcg.Extended as Random


type alias Config =
    { cards : Cards
    , seed : Maybe Int
    }


cards : Config -> Cards
cards config =
    config.cards


generator : Config -> Random.Generator Cards
generator config =
    Randomize.shuffle config.cards


decoder : Decoder Config
decoder =
    succeed Config
        |> required "cards" Data.cardsDecoder
        |> required "seed" (maybe int)
