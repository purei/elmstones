port module Simulator exposing (..)

import Randomize
import Random.Pcg as Random

import Data exposing (..)
import Simulator.Deck as Deck
import Simulator.Engine as Engine

type Msg
  = NewSim Matchup
  | GetState Int
  | Battle Engine.Msg

------------------------------------------------------------------------------


------------------------------------------------------------------------------
type alias Matchup = -- The requested Matchup to simulate
  { attacker: Competitor
  , defender: Competitor
  , seed: Int
  }
emptyMatchup = Matchup emptyCompetitor emptyCompetitor 0

type alias Competitor =
  { commander: Data.Commander
  , deck: Deck.Desc
  }
emptyCompetitor = Competitor emptyCommanderData emptySimDeck

type alias Seeds =
  { dealer: (Int, Int)
  , strategy: (Int, Int)
  , battles: (Int, Int)
  }

type alias Request =
  { matchup: Matchup
  , runs: Int
  , key: Int
  }

type alias Report =
  { wins: Int
  , key: Int
  }
------------------------------------------------------------------------------
type alias Simulation = -- This is the simulator's model
  { matchup: Matchup
  , battle: Engine.State
  , stats: Stats
  }

init matchup seed = Simulation matchup Engine.emptyBattle (initStats repeats)

type alias Stats =
  { repeats: Int
  , wins : Int
  , attempts: Int
  }
emptyStats = Stats 0 0 0
initStats repeats = Stats repeats 0 0
------------------------------------------------------------------------------
andThen f a = (a, f a)

update msg model = case msg of
  -- Intialize Simulator from (matchup,repeats) pair
  NewSim (matchup,repeats) ->
    let _ = Debug.log "simulating" matchup
    in newSim matchup repeats
  -- Instance of a match
  GetState _ -> (model, Cmd.none)

  --NOTE this is the interface between the Engine and the ports
  Battle battle_msg -> case battle_msg of -- these are battle messages we need to deal w/ at the parent
    Engine.Strategize -> pick model
      -- |> andThen (Cmd.map Battle << pick) -- FIXME awaitchoice currently not working
    Engine.AwaitChoice -> model
      |> andThen (awaitChoice << .hand << .offense << .battle)  -- need the whole fight, thus the model
    Engine.EndBattle -> updateStats model
      |> andThen maybeReport -- need the model to keep stats
    _ -> continueBattle battle_msg model

getFight {battle,matchup} = Fight matchup battle

updateStats model =
  let
    stats = model.stats
    win = case Engine.side model.battle of
      Attacker -> 1
      Defender -> 0
  in { model
    | stats = { stats
      | wins = stats.wins + win
      , attempts = stats.attempts + 1
      }
    }


type Strategy
  = Random (List Data.Unit) -- check the hand
  | Next
  | External -- error?

pick : Simulation -> (Simulation, Cmd Msg)
pick model =
  let
    matchup = model.matchup
    battle = model.battle
    offense = case Engine.side battle of -- YUK
      Attacker -> matchup.attacker
      Defender -> matchup.defender
    hand = battle.offense.hand

    createAnswer entry strat =
      let new = case (entry.strategy, strat) of
        Deck.Ordered -> Next
        Deck.Fate ->
          if
          let
            (xs, newSeed) = Random.step (Random.int 0 (hand_len-1)) seed
            model_ = { model |  }
          in
            (model_, Cmd.)
        Deck.External ->

  in case strat of
    Random list -> okay = List.foldl createAnswer  (Random []) hand
    passthru -> passthru

    cmd = if offense.strategy > (origin - remain)
      then Engine.goto (Engine.Play 0) -- just pick 'leftmost'
      else Engine.goto (Engine.Play xs)
  in (,)
    {model | current_seed = newSeed }
    cmd

-- FIXME is this the right approach?
continueBattle msg model =
  let (battle_, cmd) = Engine.updateTurn msg model.battle
  in ({ model | battle = battle_ }, Cmd.map Battle cmd)

maybeReport model =
  let stats = model.stats
  in if stats.attempts < stats.repeats
    then Engine.goto Match
    else report (Report model.matchup stats.wins stats.attempts)

-------------------------------------------------------------------------------

{-| New order, empty the battle and stats -}
beginSim = Battle Engine.StartTurn
newSim {matchup, repeats, seeds} = (,)
  (init { model | battle = setupBattle seeds matchup })
  (Engine.goto beginSim) -- FIXME, should be more like 'start'

init matchup seed = Simulation matchup Engine.emptyBattle (initStats repeats)

setupBattle : InitialSeeds -> Matchup -> Engine.State
setupBattle seeds matchup =
  let
    attacker = matchup.attacker
    defender = matchup.defender
  in
    { offense = Engine.initArmy attacker (Tuple.first seeds.battles)
    , defense = Engine.initArmy defender (Tuple.second seeds.battles)
    , turn = 0
    }
-------------------------------------------------------------------------------
--BATTLE
-- init = ((), Cmd.none)
-- subs model = Sub.batch [ choose Choose ]
-- main = Platform.program { init=init, update=update, subscriptions=subs }
------------------------------------------------------------------------------
empty = (Simulation Engine.emptyBattle emptyMatchup 0 emptyStats, Cmd.none)

main = Platform.program { init=empty, update=update, subscriptions=subs }

{-Inputs-}
port play : (Int -> msg) -> Sub msg -- port for listening for plays from JavaScript
port initSim : (Request -> msg) -> Sub msg -- Request for work
port getState : (Int -> msg) -> Sub msg
subs model = Sub.batch
  [ play (Battle << Engine.Play)
  , getState GetState
  , initSim NewSim
  ]
{-Outputs-}

-- port currentState : Engine -> Cmd msg
port awaitChoice : Engine.Hand -> Cmd msg -- port for sending battle out, also waiting for a card play
port report : Report -> Cmd msg

------------------------------------------------------------------------------
--remove n arr = Array.append (Array.slice 0 n arr) (Array.slice (n+1) (Array.length arr) arr)
