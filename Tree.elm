module Tree exposing (..)

import Types exposing (..)
import Array

-- Basic definition of a 'recursive type'?
-- Not fully understood. I tried 'Tree Record', but that's not a proper type
type Tree a
    = Empty
    | Node a (Array.Array (Tree a))

{- This is a two-player tree for a monte carlo tree search.
  The tree tracks the cards played.

  [1,2,3] represents the first player's card choices, [a,b,c] the second player's

     [    1,                 2,                 3    ]

      /   |   \          /   |   \          /   |   \

   [a,    b,    c]    [a,    b,    c]    [a,    b,    c]
   / \   / \   / \    / \   / \   / \    / \   / \   / \
  [2,3] [2,3] [2,3]  [1,3] [1,3] [1,3]  [1,2] [1,2] [1,2]

-}
type alias TwoPlayer =
    { layers: (Int, Int)
    , tree: Tree Record
    , offense_plays: Int
    }

type alias Record =
    { index: Int
    , side: Side
    , wins: Int
    , attempts: Int
    }
emptyRecord = Record 0 Attacker 0 0

empty : Tree Record
empty =
    Empty

--singleton : Int -> Record -> Tree Record
singleton n v =
    Node v <| Array.repeat n empty


insert : Record -> Tree Record -> Tree Record
insert x tree =
    case tree of
      Empty ->
          singleton 15 x

      Node y array ->
          if x > y then
              Node y array (insert x array)

          else if x < y then
              Node y (insert x array) array

          else
              tree


fromList : List Record -> Tree Record
fromList xs =
    List.foldl insert empty xs


depth : Tree Record -> Int
depth tree =
    case tree of
      Empty -> 0
      Node v array ->
          1 + Array.foldl (max << depth) 0 array
          --1 + max (depth left) (depth right)


map : (a -> b) -> Tree a -> Tree b -- hmm, both a and b?
map f tree =
    case tree of
      Empty -> Empty
      Node v array ->
          Node (f v) <| Array.map (map f) array
          --Node (f v) (map f left) (map f right)

