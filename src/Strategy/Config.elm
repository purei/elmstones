module Strategy.Config exposing (..)

import Json.Decode as Decode exposing (oneOf, Decoder, null, field)
import Strategy.Random as Random
import Strategy.Priority as Priority
import Data exposing (Cards)


type Config
    = Random Random.Config
    | Priority Priority.Config
      -- | External External.Config
    | Fate


decoder : Cards -> Decoder Config
decoder x =
    oneOf
        [ Decode.map Random <| Random.decoder x
        , Decode.map Priority <| Priority.decoder x
        , null Fate
        ]


defaultDecoder : Config
defaultDecoder =
    Fate
