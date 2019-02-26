module Multiset exposing (counts, diff, elements, flatten, foldl, fromList, remove, takeOne)

import AllDict as EDict exposing (Dict)
import Set


type alias Multiset a =
    Dict a Int


increment x =
    case x of
        Nothing ->
            Just 1

        Just i ->
            Just (i + 1)


decrement x =
    case x of
        Nothing ->
            Debug.crash "Multisest Decrement error: fewer than 0 items?"

        Just 1 ->
            Nothing

        Just i ->
            i - 1


fromList list =
    List.foldl (\key dict -> EDict.update key increment dict) EDict.empty list


takeOne key multiset =
    EDict.update key decrement multiset


remove key multiset =
    EDict.remove key multiset


flatten =
    EDict.foldl (\key val list -> list ++ List.repeat val key) []


equal a b =
    flatten a == flatten b



-- This works?


elements =
    EDict.keys


counts =
    EDict.values


foldl =
    EDict.foldl


diff : Multiset a -> Multiset a -> Dict a Int
diff full semi =
    let
        left key val dict =
            EDict.insert key val dict

        both key val1 val2 dict =
            EDict.insert key (val1 - val2) dict

        right key val dict =
            dict

        allKeys =
            EDict.keys <| EDict.intersect full semi
    in
    List.foldl
        (\k acc ->
            case ( EDict.get k full, EDict.get k semi ) of
                ( Just a, Just b ) ->
                    both k a b acc

                ( Just a, Nothing ) ->
                    left k a acc

                ( Nothing, Just b ) ->
                    right k b acc

                ( _, _ ) ->
                    acc
        )
        EDict.empty
        allKeys



-- merge
--   :  (c -> a -> result -> result)
--   -> (c -> a -> b -> result -> result)
--   -> (c -> b -> result -> result)
--   -> EveryDict c a
--   -> EveryDict c b
--   -> result
--   -> result
-- merge leftStep bothStep rightStep leftDict rightDict initialResult =
--   let
--     stepState rKey rValue (list, result) =
--       case list of
--         [] ->
--           (list, rightStep rKey rValue result)
--
--         (lKey, lValue) :: rest ->
--           if lKey < rKey then
--             stepState rKey rValue (rest, leftStep lKey lValue result)
--
--           else if lKey > rKey then
--             (list, rightStep rKey rValue result)
--
--           else
--             (rest, bothStep lKey lValue rValue result)
--
--     (leftovers, intermediateResult) =
--       List.foldl stepState (EDict.toList leftDict, initialResult) rightDict
--   in
--     List.foldl (\(k,v) result -> leftStep k v result) intermediateResult leftovers
