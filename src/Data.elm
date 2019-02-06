module Data exposing (..)

import Json.Decode exposing (Decoder, int, list, succeed, fail, string, oneOf, andThen)
import Json.Decode.Pipeline exposing (required, hardcoded)
import Result exposing (Result(..))


type alias Skill =
    { id : String
    , value : Int
    , target : Int
    , count : Int
    , all : Bool
    , target_skill : String
    }


type alias Hero =
    -- Health and Skills
    { health : Int
    , skills : List Skill
    }


emptyHero : Hero
emptyHero =
    Hero 1 []


type alias Card =
    -- Base stats given id and upgrade level and Rune
    { attack : Int
    , health : Int
    , delay : Int
    }


emptyCard : Card
emptyCard =
    Card 0 1 0


type alias Cards =
    List Card


type alias Kit =
    { hero : Hero
    , deck : Cards
    }


emptyKit : Kit
emptyKit =
    Kit emptyHero emptyCards


emptyCards : Cards
emptyCards =
    []


cardDataDecoder : Decoder Card
cardDataDecoder =
    succeed Card
        |> required "attack" int
        |> required "health" int
        |> required "delay" int


cardsStringDecoder : Decoder Cards
cardsStringDecoder =
    string
        |> andThen stringCardListDecoder


cardsDecoder : Decoder Cards
cardsDecoder =
    oneOf
        [ list cardDataDecoder
        , cardsStringDecoder
        ]


heroDecoder : Decoder Hero
heroDecoder =
    succeed Hero
        |> required "health" int
        |> hardcoded []


stringHeroDecoder : String -> Decoder Hero
stringHeroDecoder input =
    let
        hero =
            input
                |> String.trim
                |> String.toInt
    in
        case hero of
            Just health ->
                succeed <| Hero health []

            Nothing ->
                fail <| "Could not parse hero stats: " ++ input


stringCardDecoder : String -> Result String Card
stringCardDecoder input =
    let
        list =
            input
                |> String.split "/"
                |> List.map (String.toInt << String.trim)
    in
        case list of
            [ Just attack, Just health, Just delay ] ->
                Ok <| Card attack health delay

            _ ->
                Err <| "Could not parse card stats: " ++ input


stringCardListDecoder : String -> Decoder Cards
stringCardListDecoder input =
    let
        list =
            input
                |> String.split ","
                |> List.map (stringCardDecoder << String.trim)

        partitionFn entry acc =
            case ( entry, acc ) of
                ( Ok card, Ok card_list ) ->
                    Ok <| card_list ++ [ card ]

                ( Ok card, Err msg_list ) ->
                    Err msg_list

                ( Err msg, Ok card_list ) ->
                    Err [ msg ]

                ( Err msg, Err msg_list ) ->
                    Err <| msg_list ++ [ msg ]

        outcome =
            List.foldl partitionFn (Ok []) list
    in
        case outcome of
            Ok card_list ->
                succeed card_list

            Err msg_list ->
                fail <| String.join "; " msg_list
