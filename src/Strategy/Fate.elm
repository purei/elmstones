module Strategy.Fate exposing (play)

import Data exposing (Card, Cards)


{-| playing is picking the first one in the hand
-}
play : Cards -> ( Maybe Card, Cards )
play hand =
    case hand of
        [] ->
            ( Nothing, hand )

        card :: rest ->
            ( Just card, rest )
