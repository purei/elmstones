port module MCTS exposing (..)

import List.Extra as Lex

import PartialPermute
import Combination
import Multiset
import Task
import Realizations exposing (Realizations)
-- import MCTS.Tree as Tree

import Data

numRuns = 4
depth = 4

goto x = Task.perform identity (Task.succeed x)

-- Input Question
type alias Matchup =
  { attacker: Data.Kit
  , defender: Data.Kit
  }

-- Output Question
type alias Request =
  { attacker: SplitKit
  , defender: Data.Kit
  , attempts: Int
  }
type alias Kit = Data.Kit
type alias SplitKit = { commander: Data.Commander, deck: SplitDeck }
type alias SplitDeck = { fixed: Data.Deck, random: Data.Deck }

-- Input Answer
type alias Report =
  { matchup: Request
  , wins: Int
  }

-- Internal Model
type alias TreeSearch =
  { matchup: Matchup
  , total: Int
  , data: Realizations
  , continue: Bool
  , currentList: List (List Data.Unit)
  }

initAnalysis matchup =
    -- comparableDeck = List.map Realizations.unitDataToKey matchup.attacker.deck
    -- unitKeyLists = List.concatMap (\x -> PartialPermute.chunkToDepth x comparableDeck) (List.range 0 depth)
    -- _ = Debug.log "calculating permutations: " <| List.length unitKeyLists
    -- _ = Debug.log "kk" <| PartialPermute.chunkToDepth 0 comparableDeck
    -- _ = Debug.log "kk" <| PartialPermute.chunkToDepth 1 comparableDeck
    -- init_ = (List.map (\list -> List.map Realizations.unitKeyToData list) unitKeyLists)
    TreeSearch matchup 0 Realizations.empty True -- FIXME MAYBE????

type Msg = Result Report | GetNext | Analysis Matchup | WaitForAnalysis

maybeDeeper model = -- Lots here.
   final model

update msg model =
  case msg of
    GetNext ->
      let
        possibleDeck = List.head model.currentList
      in case possibleDeck of
        Nothing -> maybeDeeper model
        Just deck ->
          let
            matchup = model.matchup
            attacker = matchup.attacker
            m_deck = Multiset.fromList attacker.deck
            m_tail = Multiset.diff m_deck (Multiset.fromList deck)
            deck_ : List Data.Unit
            deck_ = deck
            attacker_ : SplitKit
            attacker_ =
              { commander = attacker.commander
              , deck =
                { fixed = deck
                , random = Multiset.flatten m_tail
                }
              }
            possibleTail = List.tail model.currentList
            -- _ = Debug.log "Brain doing:" deck
          in case possibleTail of
            Nothing -> Debug.crash "Had nothing to do?"
            Just rest ->
              ( { model | currentList = [] }
              , resolve <| Request attacker_ matchup.defender numRuns
              )
    Result {matchup,wins,attempts} ->
      let
        -- _ = Debug.log "Brain results!" (wins,attempts)
        key = getKeyFromMatchup matchup
        -- _ = Multiset.fromList matchup.attacker.player.deck
      -- make sure matchups are the same, then update the tree.
      in (,)
        { model | data = Realizations.addData (wins,attempts) 1 key model.data }
        (goto GetNext)
    Analysis matchup -> (initAnalysis matchup, goto GetNext)
    WaitForAnalysis -> (,)
      { model | continue = False }
      Cmd.none

getKeyFromMatchup matchup =
  let
    competitor = matchup.attacker
    deck = competitor.deck
    num = competitor.dealer
  in
    List.take num deck
    --List.map Reali..key...

factor = sqrt 2
ln = logBase e
-- w_i / n_i + c sqrt (log N / n_i)
-- N = sum n_i

calc total (key,{wins,attempts}) = (,) key <|
  if attempts == 0
    then 0
    else
      let p = wins / attempts
      in 2 * sqrt (p * (1-p)) + factor * sqrt (ln total / attempts)

getList model = List.map (calc model.total) (Realizations.toList model.data)

final model =
  let
    _ = Debug.log "Brain done! data:" (Realizations.keys model.data)
    stats = List.foldl (\{wins,attempts} (x,y) -> (x+wins,y+attempts)) (0,0) (Realizations.values model.data)
    _ = Debug.log "Brain RNG win%" <| (toFloat <| Tuple.first stats) / (toFloat <| Tuple.second stats)
    comparableDeck = model.matchup.attacker.deck
    combos = Combination.combinations depth comparableDeck
    -- dd = Combination.combinations (depth-1) comparableDeck
    -- d = Combination.combinations (depth-2) comparableDeck
    -- _ = Debug.log "combos" <| (List.length d, List.length dd, List.length combos)
    getMax x = case List.maximum x of
      Nothing -> Debug.crash "Brain no data/no maximum? something's not possible"
      Just i -> i
    bests = List.map (\combo ->
        let
          allPerms = Lex.permutations combo
          -- _ = Debug.log "ap" (allPerms,model.data)
          get x = case Realizations.get x model.data of
            Nothing ->
              Debug.crash ("Brain could not find" ++ toString x)
            Just i -> i
          getWins = List.map (.wins<<get) allPerms
        in getMax getWins
      ) combos
    -- _ = Debug.log "ok" combos
    -- _ = Debug.log "tote" <| List.map (List.map factorial<<Multiset.counts<<Multiset.fromList) combos

    {- what if we walked through a brain dump and  -}
    -- _ = Debug.log "Brain combo wins" <| List.map2 (,) bests combos
    _ = Debug.log "Brain O3 win%" <| (toFloat <| List.sum bests) / (toFloat <| List.length bests) / numRuns
  in (model, Cmd.none)

factorial n = case n of
  0 -> 1
  _ -> n * factorial (n-1)

{-Inputs-}
port analyze : (Matchup -> msg) -> Sub msg
port results : (Report -> msg) -> Sub msg
{-Outputs-}
port resolve : Request -> Cmd msg

init = (initAnalysis (Matchup Data.emptyKit Data.emptyKit), Cmd.none)
subs model = Sub.batch
  [ results Result
  , analyze Analysis
  ]
main = Platform.program { init=init, update=update, subscriptions=subs }
