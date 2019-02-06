module Strategy.Random exposing (Config, Strategy, decoder, init, play)

import Data exposing (Card, Cards)
import Json.Decode exposing (Decoder, int, maybe, succeed)
import Json.Decode.Pipeline exposing (required)
import Random.Extra as Randomize
import Random.Pcg.Extended as Random exposing (Seed)



-- first deal and play in order, then shuffle and play in order


type alias Config =
    { seed : Maybe Int
    }


type alias Strategy =
    Seed


decoder : Cards -> Decoder Config
decoder cards =
    succeed Config
        |> required "seed" (maybe int)


init : Seed -> Config -> Strategy
init givenSeed { seed } =
    case seed of
        Nothing ->
            givenSeed

        Just seed_ ->
            Random.initialSeed seed_ []


play : Strategy -> Cards -> ( Maybe Card, Cards, Strategy )
play seed hand =
    let
        generator =
            Randomize.choose hand

        ( ( possibleCard, new_hand ), new_seed ) =
            Random.step generator seed
    in
    ( possibleCard, new_hand, new_seed )
