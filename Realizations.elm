module Realizations exposing (..)
{-| A realization of a random variable.  Can we guess at how random? If it's a coin flip, can we know?
-}
import Data exposing (Unit)
import EveryDict as Dict exposing (EveryDict)

-- dict keys gotta be tuples
-- unitDataToKey {attack,health,delay} = (attack,health,delay)
-- type alias UnitKey = (Int,Int,Int)
-- unitKeyToData (attack,health,delay) = Data.Unit attack health delay

type alias UnitKey = Unit
type alias PlayOrder = List UnitKey

type alias Stat =
  { wins: Int
  , attempts: Int
  , multiplier: Int -- Likelihood, n! kinda thing? FINISHME
  }
type alias Realizations = EveryDict PlayOrder Stat

empty = Dict.empty
get = Dict.get
update = Dict.update
toList = Dict.toList
keys = Dict.keys
values = Dict.values

(<<|) = flip List.map -- used?

mult = List.foldl (*) 1 << List.map .multiplier << Dict.values

addData : (Int, Int) -> Int -> PlayOrder -> Realizations -> Realizations
addData (wins,attempts) mult key =
  let updateFn entry = case entry of
      Nothing -> Just <| Stat wins attempts mult -- 'insert new'
      Just stat -> Just <| Stat (wins + stat.wins) (attempts + stat.attempts) mult
  in Dict.update key updateFn

updateData : (Int, Int) -> PlayOrder -> Realizations -> Realizations
updateData (wins,attempts) key =
  let updateFn entry = case entry of
      Nothing -> Just <| Stat wins attempts 1 -- FIXME 'insert new'
      Just stat ->
        Just <| Stat (wins + stat.wins) (attempts + stat.attempts) stat.multiplier
  in Dict.update key updateFn
