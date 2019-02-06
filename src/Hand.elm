module Hand exposing
    ( Hand
    , add
    , cards
    , init
    , isFull
    , set
    , size
    )

import Data



-- import Randomize
-- import Random.Pcg as Random


type alias Hand =
    { cards : List Data.Card
    }



-- type PlayFrom
--   = NotInHand
--   | Empty
--   | Play Data.Card
--
-- type DrawTo
--   = Full
--   | Drawn Context


init : Hand
init =
    { cards = []
    }


set : Hand -> List Data.Card -> Hand
set hand cards_ =
    { hand | cards = cards_ }


add : Data.Card -> Hand -> Hand
add card hand =
    { hand | cards = hand.cards ++ [ card ] }



-- helpers


cards : Hand -> List Data.Card
cards hand_ =
    hand_.cards


size : Hand -> Int
size hand =
    List.length hand.cards


isFull : Hand -> Int -> Bool
isFull hand max =
    size hand >= max
