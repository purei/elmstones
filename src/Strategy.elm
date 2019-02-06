module Strategy exposing (Config, Strategy, play, prepare)

-- import Strategy.External as External

import Battle.Report exposing (Input)
import Data exposing (Card, Cards)
import Random.Pcg.Extended as Random
import Strategy.Config as Cfg
import Strategy.Fate as Fate
import Strategy.Priority as Priority
import Strategy.Random as Random


type alias Config =
    Cfg.Config


type Strategy
    = Fate --Fate.Strategy
    | Priority Priority.Strategy
      -- | External External.Strategy
    | Random Random.Strategy


play : Strategy -> Input -> Input -> Int -> ( Maybe Card, Cards, Strategy )
play strategy ( o_army, o_deck, o_hand ) ( d_army, d_deck, d_hand ) turn =
    case strategy of
        Fate ->
            let
                ( maybeCard, rest ) =
                    Fate.play o_hand
            in
            ( maybeCard, rest, Fate )

        -- External external ->
        --   let () = External.play external
        --   in
        Random random ->
            let
                ( maybeCard, rest, new_strategy ) =
                    Random.play random o_hand
            in
            ( maybeCard, rest, Random new_strategy )

        Priority priority ->
            let
                ( maybeCard, rest, new_strategy ) =
                    Priority.play priority o_hand
            in
            ( maybeCard, rest, Priority new_strategy )


prepare : Random.Seed -> Config -> Cards -> Strategy
prepare seed config cards =
    case config of
        Cfg.Fate ->
            Fate

        Cfg.Random config_ ->
            Random <| Random.init seed config_

        Cfg.Priority config_ ->
            Priority <| Priority.init config_ cards
