module Simulator.Deck.Ordered exposing (..)

import Card exposing (Card)
import Random.Pcg as Random

type Dealer
  = Bottom (List Card) -- fixed order
  | Top (List Card) -- random order

getNextCard : Seed -> Dealer -> Data.Deck -> (Seed, Data.Unit, Data.Deck)
getNextCard seed dealer list =
  case (dealer, list) of
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
