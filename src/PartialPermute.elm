module PartialPermute exposing (listToDepth, chunkToDepth)

import Multiset

recurse kind depth mset =
  let
    keys = Multiset.elements mset
    trick key list =
      if List.isEmpty list
        then [[key]]
        else List.map ((::) key) list
  in
    if List.length keys <= 0
      then []
      else
        if depth == 0
          then
            if kind == 0
              then [[]]
              else [Multiset.flatten mset]
          else
            let dec key = Multiset.takeOne key mset
            in List.concatMap (\key -> trick key (recurse kind (depth-1) (dec key))) keys

numEntries n d = -- factorials in numerator and denominator
  if d == 0
    then 1
  else case n of
    0 -> 1
    1 -> 1
    2 -> 2
    _ -> n * numEntries (n-1) (d-1)

-- Multiset strips duplicates, recurse builds the lists
listToDepth depth list =
  let
    dedup = Multiset.fromList list
    entries = numEntries (List.length list) depth
  in if entries > 10000
    then Debug.crash "maybe too many entries attempted" -- duplicates makes this harder to answer
    else recurse 1 depth dedup

chunkToDepth depth list =
  let
    dedup = Multiset.fromList list
    entries = numEntries (List.length list) depth
  in if entries > 10000
    then Debug.crash "maybe too many entries attempted" -- duplicates makes this harder to answer
    else recurse 0 depth dedup
