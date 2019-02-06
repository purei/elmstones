module Deck.Stacked exposing (Config, cards, decoder, generator)

import Data exposing (Cards)
import Json.Decode exposing (Decoder, succeed)
import Json.Decode.Pipeline exposing (required)
import Random.Pcg.Extended as Random


type alias Config =
    { cards : Cards
    }


cards : Config -> Cards
cards config =
    config.cards


generator : Config -> Random.Generator Cards
generator config =
    Random.constant config.cards


decoder : Decoder Config
decoder =
    succeed Config
        |> required "cards" Data.cardsDecoder
