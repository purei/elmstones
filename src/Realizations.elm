module Realizations exposing (PlayOrder, Realizations, Stat, UnitKey, addData, empty, get, keys, mult, toList, update, updateData, values)

{-| A realization of a random variable. Can we guess at how random? If it's a coin flip, can we know?
-}

import AllDict as EDict exposing (Dict)
import Data exposing (Card)



-- dict keys gotta be tuples
-- unitDataToKey {attack,health,delay} = (attack,health,delay)
-- type alias UnitKey = (Int,Int,Int)
-- unitKeyToData (attack,health,delay) = Data.Unit attack health delay


type alias UnitKey =
    Card


type alias PlayOrder =
    List UnitKey


type alias Stat =
    { wins : Int
    , attempts : Int
    , multiplier : Int -- Likelihood, n! kinda thing? FINISHME
    }


type alias Realizations =
    Dict PlayOrder Stat


empty =
    EDict.empty


get =
    EDict.get


update =
    EDict.update


toList =
    EDict.toList


keys =
    EDict.keys


values =
    EDict.values



-- used?


mult =
    List.foldl (*) 1 << List.map .multiplier << EDict.values


addData : ( Int, Int ) -> Int -> PlayOrder -> Realizations -> Realizations
addData ( wins, attempts ) mult key =
    let
        updateFn entry =
            case entry of
                Nothing ->
                    Just <| Stat wins attempts mult

                -- 'insert new'
                Just stat ->
                    Just <| Stat (wins + stat.wins) (attempts + stat.attempts) mult
    in
    EDict.update key updateFn


updateData : ( Int, Int ) -> PlayOrder -> Realizations -> Realizations
updateData ( wins, attempts ) key =
    let
        updateFn entry =
            case entry of
                Nothing ->
                    Just <| Stat wins attempts 1

                -- FIXME 'insert new'
                Just stat ->
                    Just <| Stat (wins + stat.wins) (attempts + stat.attempts) stat.multiplier
    in
    EDict.update key updateFn
