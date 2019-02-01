module Simulator.Engine exposing (..)

import Array exposing (Array)
import List.Extra as Lex
import Task

import Simulator.Deck as Deck exposing (Deck)
import Data
import Commander exposing (Commander)
import Unit exposing (Unit)

import Randomize
import Random.Pcg as Random

type alias Seed = Random.Seed

goto x = Task.perform identity (Task.succeed x)

type Side = Attacker | Defender
-- FIXME -- needing this is janky
side battle = if battle.turn == 0
  then Debug.crash "never should happen"
  else case battle.turn % 2 of
    1 -> Attacker
    0 -> Defender
    _ -> Debug.crash "math says no"

{- Engine.State is the current state of a fight:
  Two armies with all wounds, each with a hand, remaining deck
  The turn number
  -- Eventually, we add each action
-}
type alias State =
  { offense: Army
  , defense: Army
  , turn: Int
  }
emptyBattle = State emptyArmy emptyArmy 0

type alias Army =
  { commander: Commander
  , deck: Deck -- contains a seed
  , hand: Hand
  , combatants: Combatants
  , battleSeed: Seed
  }
type alias Combatants = Array Unit
emptyArmy = Army (Commander.init Data.emptyCommander) Deck.empty emptyHand emptyCombatants (Random.initialSeed 0) -- FIXME
type alias HeldCard = (Data.Unit, Deck.Strategy)
type alias Hand = List HeldCard
emptyHand = []
emptyCombatants = Array.empty

initArmy : Data.Commander -> Deck.Desc -> Int -> Int -> Army
initArmy commander deck battle_seed deck_seed =
  Army
    (Commander.init commander)
    (Deck.init deck_seed deck)
    emptyHand
    emptyCombatants
    (Random.initialSeed battle_seed)

---------------------------------------------------------------

type Msg
  = TakeSides
  | StartTurn
  | Draw
  | Play Int -- which of your hand
  | Melee Position
  | RemoveDead
  --
  | Strategize
  | AwaitChoice
  | EndBattle
type alias Position = Int

andThen f a = (a, f a) -- helpful for (model, cmd) architecture

maxTurns = 100
handSize = 3

-- These update states are 'one turn' in a battle
updateTurn msg battle = battle |> case msg of
  TakeSides -> takeSides
            >> andThen startTurn

  StartTurn -> reduceDelay
            >> andThen maybeDrawCard

  Draw -> drawCard
       >> andThen maybeDrawCard

  Play pos -> playCard pos
           >> andThen maybeStartMelee

  Melee pos -> melee pos -- this continues Meleeing. FIXME? better way to do this?

  RemoveDead -> removeDead
             >> andThen maybeEndBattle

  _ -> Debug.crash "should've been taken care of by Simulator"

-- BOTH
takeSides battle = { battle
  | turn = battle.turn + 1
  , offense = battle.defense
  , defense = battle.offense
  }

startTurn _ = goto StartTurn
reduceDelay battle = offensiveLine Unit.reduceDelay battle

anyOf list target = List.foldl (\f a -> f target || a) False list
allOf list target = List.foldl (\f a -> f target && a) True list

melee pos battle =
  let
    maybeMeleeNext = maybeMelee (pos+1)
    off_line = Array.get pos battle.offense.combatants
  in case off_line of
    Nothing -> (battle, goto RemoveDead)
    Just off_unit ->
      let
        attack = off_unit.base.attack
        defense = battle.defense
        def = Array.get pos defense.combatants
      in
        if allOf [Unit.isAlive, Unit.isActive] off_unit
          then case def of
            Nothing ->
              let
                calc_dam = Commander.reduceHealth attack
                battle_ = alterBattle Defender (alterCommander calc_dam) battle
              in if Commander.isAlive battle_.defense.commander
                then battle_
                  |> andThen maybeMeleeNext
                else (battle_, goto EndBattle)
            Just def_unit ->
              let
                reducedHealthUnit = Unit.reduceHealth attack def_unit
                def_ = { defense |
                  combatants = Array.set pos reducedHealthUnit defense.combatants }
              in { battle | defense = def_ }
               |> andThen maybeMeleeNext
          else battle
            |> andThen maybeMeleeNext

-- ONLY CMD
maybeDrawCard battle =
  let
    offense = battle.offense
    hand_len = List.length offense.hand
    deck_len = Deck.length offense.deck
    need_card = hand_len < handSize
    card_available = deck_len > 0
  in if need_card && card_available
    then goto Draw
    else maybePlay battle

maybePlay battle =
  let
    hand_len = List.length battle.offense.hand
    card_choice = hand_len > 1
  in if card_choice
    then goto Strategize
    else
      let any_cards = hand_len > 0
      in if any_cards
        then goto (Play 0)
        else maybeStartMelee battle

maybeMelee pos battle =
  let
    line_len = Array.length battle.offense.combatants
    isAnotherFighter = line_len > pos
  in if isAnotherFighter
    then goto (Melee pos)
    else goto RemoveDead
maybeStartMelee = maybeMelee 0

maybeEndBattle battle =
  let noMoreTurns = battle.turn == maxTurns
  in if noMoreTurns
    then goto EndBattle
    else goto TakeSides

----------------------------------------------------------------

disconnectHead list =
  case list of
    [] -> Debug.crash "not allowed"
    [head] -> (head, [])
    head::rest -> (head, rest)

disconnectPos pos list =
  let
    (front, back_) = Lex.splitAt pos list
    (card, back) = disconnectHead back_
  in (card, front ++ back)

lineFilter filter side = { side | combatants = Array.filter filter side.combatants }
lineMap map side = { side | combatants = Array.map map side.combatants }

offensiveLine fn battle = { battle | offense = lineMap fn battle.offense }
defensiveLine fn battle = { battle | defense = lineMap fn battle.defense }

drawCard : State -> State
drawCard battle = -- FIXME add strat
  let
    offense = battle.offense
    (unit, strategy, deck_) = Deck.getNext offense.deck
    hand_ = offense.hand ++ [(unit, strategy)]
  in { battle | offense = { offense | hand = hand_, deck = deck_ } }

playCard : Int -> State -> State
playCard pos battle =
  let
    offense = battle.offense
    ((card,_), hand_) = disconnectPos pos offense.hand
    line_len = Array.length offense.combatants
    offense_ = { offense
      | combatants = Array.push (Unit.init card) offense.combatants
      , hand = hand_
      }
  in { battle | offense = offense_ }

alterCommander fn army = { army | commander = fn army.commander }
-- alterLine fn army = { army | combatants = fn army.combatants } -- hrmh

alterBattle side fn battle =
  case side of
    Attacker -> { battle | offense = fn battle.offense }
    Defender -> { battle | defense = fn battle.defense }

removeDead battle = { battle
  | offense = lineFilter Unit.isAlive battle.offense
  , defense = lineFilter Unit.isAlive battle.defense
  }
