module Tests exposing (all)

import Test exposing (..)
import Expect
import Fuzz exposing (intRange, list, tuple)

import Combination

all : Test
all =
  describe "elmstone tests"
    [ describe "compare lengths of combination list and combination count" <|
      let
        n = [1,2,3,4]
        m1 = [1,1,2,3]
        m1_ = [1,2,3,3]
        m2 = [1,1,2,2]
        m3 = [1,2,1,1]
        m4 = [1,1,2,2,2,3,3]
        full k n = List.length <| Combination.combinations k n
        count k n = Combination.count_combos k n
        full_vs_count k n = Expect.equal (full k n) (count k n)
      in
        [ test "Nonsense k" <|
          \() ->
            full_vs_count -1 n

        , test "Empty Set" <|
          \() ->
            full_vs_count 0 []

        , test "Set k=1" <|
          \() ->
            full_vs_count 1 n

        , test "Set k=2" <|
          \() ->
            full_vs_count 2 n

        , test "Multiset front" <|
          \() ->
            full_vs_count 2 m1

        , test "Multiset back" <|
          \() ->
            full_vs_count 2 m1_

        , test "Mset double" <|
          \() ->
            full_vs_count 2 m2

        , test "Too many" <|
          \() ->
            full_vs_count 3 m3

        , test "Mset harder?" <|
          \() ->
            full_vs_count 3 m4

        , fuzz (tuple (intRange 2 5,list (intRange 1 4))) "Various" <|
          \(k,n) ->
            full_vs_count k n
        ]
    ]
