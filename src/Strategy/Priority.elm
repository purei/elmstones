module Strategy.Priority exposing (Config, Strategy, decoder, init, play)

import Data exposing (Card, Cards)
import Json.Decode exposing (Decoder, fail, int, list, succeed)
import Json.Decode.Pipeline exposing (required, resolve)
import List.Extra as Lex


type alias Config =
    { order : List Int
    }


type alias Strategy =
    { order : List Card
    , unused : List Bool
    }


{-| JSON = { order: [ 8, 3, 1, ... ] }
-}
decoder : Cards -> Decoder Config
decoder cards =
    let
        decodeResolve list =
            if
                List.length cards
                    == List.length list
                    && (List.sort list
                            |> List.indexedMap Tuple.pair
                            |> List.foldl (\( x, y ) acc -> acc && x + 1 == y) True
                       )
            then
                succeed <| Config list

            else
                fail "Order must be a permutation of the list 1..length."
    in
    succeed decodeResolve
        |> required "order" (list int)
        |> resolve


init : Config -> Cards -> Strategy
init { order } cards =
    let
        ordered_cards =
            List.indexedMap Tuple.pair order
                |> List.sortBy Tuple.second
                |> List.map2 (\card_ ( index, _ ) -> ( index, card_ )) cards
                |> List.sortBy Tuple.first
                |> List.map Tuple.second
    in
    Strategy
        ordered_cards
        (List.repeat (List.length cards) True)


avail : Card -> Int -> ( Card, Bool ) -> ( Int, Bool )
avail heldCard idx_ ( card_, unused_ ) =
    ( idx_, card_ == heldCard && unused_ )


zipTogether : List Card -> List Bool -> List ( Int, Card, Bool )
zipTogether cards bools =
    List.map2 (\card_ use -> ( card_, use )) cards bools
        |> List.indexedMap (\idx_ ( card_, use ) -> ( idx_, card_, use ))


idx : ( Int, Card, Bool ) -> Int
idx ( a, _, _ ) =
    a


card : ( Int, Card, Bool ) -> Card
card ( _, b, _ ) =
    b


unused : ( Int, Card, Bool ) -> Bool
unused ( _, _, c ) =
    c


{-| get best priority from those in the hand
-}
play : Strategy -> Cards -> ( Maybe Card, Cards, Strategy )
play strategy hand =
    let
        sorted_hand =
            zipTogether strategy.order strategy.unused
                |> List.filter (\entry -> unused entry && List.member (card entry) hand)

        priority =
            List.head sorted_hand

        new_strategy =
            priority
                |> Maybe.andThen
                    (\priority_ ->
                        Just
                            { strategy | unused = Lex.setAt (idx priority_) True strategy.unused }
                    )
                |> Maybe.withDefault strategy
    in
    case priority of
        Nothing ->
            let
                _ =
                    Debug.log "Trying to play with an empty hand... or something terrible" hand
            in
            ( Nothing, hand, new_strategy )

        Just ( _, card_, _ ) ->
            ( Just card_, Lex.remove card_ hand, new_strategy )
