module Deck.Partial exposing (Config, cards, decoder, generator)

import Data exposing (Cards)
import Json.Decode exposing (Decoder, succeed)
import Json.Decode.Pipeline exposing (required)
import Random.Extra as Randomize
import Random.Pcg.Extended as Random


type alias Config =
    { leading : Cards
    , remaining : Cards
    }


generator : Config -> Random.Generator Cards
generator { leading, remaining } =
    Random.map2 (++)
        (Random.constant leading)
        (Randomize.shuffle remaining)


cards : Config -> Cards
cards config =
    config.leading ++ config.remaining


decoder : Decoder Config
decoder =
    succeed Config
        |> required "leading" Data.cardsDecoder
        |> required "remaining" Data.cardsDecoder
