port module Player exposing (..)

import Types exposing (..)
import Random.Pcg

--trans p =
--  case p of
--    Fixed -> 15
--    Random -> 0
--    Mixed int -> int

type Msg = Choose Fight | GetRandom Int

update msg model =
  case msg of
    Choose fight -> play fight
    GetRandom idx -> (model, chosen idx)

gen = Random.Pcg.generate GetRandom
play {matchup,battle} =
  let
    offense = case side battle of -- YUK
      Attacker -> matchup.attacker
      Defender -> matchup.defender
    origin = List.length offense.player.deck
    hand_len = List.length battle.offense.hand
    remain = (List.length battle.offense.deck) + hand_len
  in (,) () <|
    if offense.strategy > (origin - remain)
      then chosen 0 -- just pick 0
      else gen <| Random.Pcg.int 0 (hand_len-1)

port choose : (Fight->msg) -> Sub msg

port chosen : Int -> Cmd msg


init = ((), Cmd.none)
subs model = Sub.batch [ choose Choose ]
main = Platform.program { init=init, update=update, subscriptions=subs }
