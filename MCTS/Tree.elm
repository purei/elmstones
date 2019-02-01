module MCTS.Tree exposing (..)

import Data
import EveryDict as Dict exposing (EveryDict)

type alias Tree =
  { depth: Int
  , model: Model
  }
init = Tree 0 (Leaf emptyStat)

type Node a
  = Node a Branches

type alias Key = Data.Deck
type alias Branches = EveryDict Key (Node a)

type alias Stat =
  { wins: Int
  , attempts: Int
  , multiplier: Int -- Likelihood, n! kinda thing? FINISHME
  }
emptyStat = Stat 0 0 0

map fn (Node stat children) =
  Node (fn stat) (EveryDict.map (map fn) children)

get deck tree =
  get_ List.length deck deck tree

-- get_ : -> Maybe Stat
get_ depth deck node =
  case depth of
    0 -> EveryDict.get deck children
    _ -> get_ (depth+1) deck node
