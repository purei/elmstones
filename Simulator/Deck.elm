module Simulator.Deck exposing (..)

import Json.Decode exposing (string, list)
import Json.Decode.Pipeline exposing (decode, required)

import List.Extra as Lex
import Random.Pcg as Random
import Data

type alias Seed = Random.Seed

type alias Desc = List Partial

type alias Deck =
  { seed: Seed
  , partials: List Partial
  }

type alias Partial =
  { strategy: Strategy
  , dealer: Dealer
  , list: Data.Deck
  }

init : Int -> Desc -> Deck
init seed desc = Deck (Random.initialSeed seed) desc

length : Deck -> Int
length deck = List.foldl (\x a -> List.length x.list + a) 0 deck.partials

empty = init 0 []

splitHead list = case list of
  [] -> Debug.crash "no head here.  something's wrong."
  head :: tail -> (head, tail)

-- Strategy returned also, bc we need to know when we play
type alias UnitChoice = (Data.Unit, Strategy, Deck)

type Deck
  -- first deal and play in order, then shuffle and play in order
  = FixedFate Data.Deck Data.Deck
  -- dealt randomly, played with priority based on the order given
  | Ordered Data.Deck
  -- dealt randomly/fixed, played with external
  | Player Bool Data.Deck
  --
  | 

getNextCard : Seed -> Data.Deck -> (Seed, Data.Unit, Data.Deck)
getNextCard seed deck =
  case deck of

    (_, []) ->
      Debug.crash "No next card to get!"
    (BottomDeal, head :: tail) ->
      (seed, head, tail)
    (TopDeal, list) ->
      let
        lastIndex = List.length list - 1
        (i, seed_) = Random.step (Random.int 0 lastIndex) seed
        entry = List.head (List.drop i list)
        (unit_, list_) = case entry of
          Nothing -> Debug.crash "not possible"
          Just entry_ ->
            (entry_, (List.take i list) ++ (List.drop (i+1) list))
      in
        (seed_, unit_, list_)

getNext : Deck -> UnitChoice
getNext deck =
  let
    (partial, rest) = splitHead deck.partials
    (seed_, unit, list_) = getNextCard deck.seed partial.dealer partial.list
    partials_ = if List.length list_ > 0
      then {partial | list = list_} :: rest
      else rest
    deck_ = { deck | seed = seed_, partials = partials_ }
  in
    (unit, partial.strategy, deck_)

---------------------------------------------------------------------------

type alias PartialJSON =
  { strategy: String
  , dealer: String
  , list: Data.Deck
  }

userDecoder =
  decode PartialJSON
    |> required "strategy" string
    |> required "dealer" string -- `null` decodes to `Nothing`
    |> required "list" (list string)
