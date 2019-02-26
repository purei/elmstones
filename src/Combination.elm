module Combination exposing (combinations,count_combos)

import Multiset

getAt i list =
  if i < 1
    then 1
    else
      case List.head (List.drop (i-1) list) of
        Nothing -> 0
        Just a -> a

generate depth mset =
  let
    keys = Multiset.elements mset
    len = List.length keys
    total = List.sum (Multiset.counts mset)
    attach key list =
      if List.isEmpty list
        then [[key]]
        else List.map ((::) key) list
  in
    if total - depth < 0
      then []
      else
        if depth <= 0
          then [[]]
          else
            let
              dec key mset = Multiset.takeOne key mset
              them = List.foldl (\key list ->
                  case list of
                    [] -> []
                    entry::tail ->
                      let (prevkey,mset) = entry
                      in if (List.sum (Multiset.counts mset)) - depth >= 0
                        then (-1, Multiset.remove key mset) :: (key, mset) :: tail
                        else list
                )
                [(-1,mset)]
                keys
                  |> List.drop 1
                  |> List.reverse
              attach_ (key,mset) = attach key (generate (depth-1) (dec key mset))
            in List.concatMap attach_ them


-- multiset groups duplicates, generate builds the lists
combinations : Int -> List comparable -> List (List comparable) -- necessary!!! maybe cus debug?
combinations k list =
  let
    mset = Multiset.fromList list
    -- _ = Debug.log "k" <| (k, List.sum (Multiset.counts mset))
    ok = generate k mset
    -- _ = Debug.log "k" ok
  in ok

-- add values of smaller list, l1, to larger one, l2, shifted in by some amount
add shift l1 l2 =
  let
    head2 = List.take shift l2
    active = List.drop shift l2
    end2 = List.drop (List.length l1 + shift) l2
  in
    head2 ++ List.map2 (+) l1 active ++ end2

multiplyOneVector size acc =
  let
    n = size + 1
    one_vector = List.repeat n 1
    new = List.repeat (size + List.length acc) 0
  in
    Tuple.second <| List.foldl (\entry (i,full) -> (i+1, add i acc full)) (0,new) one_vector

count k list = List.foldl multiplyOneVector [1] list

count_combos k list =
  let
    list_ = Multiset.counts <| Multiset.fromList list
    ans = count k list_
  in getAt (k+1) ans
