port module Calculator exposing (..)

import Json.Decode
import Types exposing (..)

type Msg = Get (Matchup,Bool,Float) | Want String

alpha = 0.1

type Output = (String,Int,Float,Float,Float,Float)

update msg model =
  case msg of
    Get (matchup,won,time) ->
      let model_ = add time model
      in ({model_ | wins = model_.wins + (if won then 1 else 0) }, Cmd.none)
    Want echo ->
      let
        mean = get_mean model
        exp_mean = get_exp_mean model
        var = get_variance model
        success = (toFloat model.wins) / (toFloat model.n)
      in (model, give (echo,model.n,mean,exp_mean,var,success))

add x m =
  let
    k = if (m.n == 0) then x else m.k
    diff = x - k
  in { m
    | k = k
    , n = m.n + 1
    , d = m.d + diff
    , d2 = m.d2 + diff * diff
    , em = add_em x m
    }

add_em x m =
  let
    a = 20
    n = toFloat m.n
    alpha = if m.n < a then (a-n)/a else 1/a
    x_ = if (m.n == 0) then x else m.em
  in
    (1-alpha) * x_ + alpha * x

get_mean m = m.k + m.d / (toFloat m.n)
get_variance m =
  let n = toFloat m.n
  in (m.d2 - (m.d * m.d)/n) / (n-1)
get_exp_mean m = m.em

{- Input -}
port input : ((Matchup,Bool,Float) -> msg) -> Sub msg
port want : (String->msg) -> Sub msg
subs model = Sub.batch [ input Get, want Want ]

{- Output -}
port give : (String,Int,Float,Float,Float,Float) -> Cmd msg

type alias Model =
  { k: Float
  , n: Int
  , d: Float
  , d2: Float
  , em: Float
  , wins: Int
  }

cleanSlate = Model 0 0 0 0 0 0
init = (cleanSlate, Cmd.none)
main = Platform.program { init=init, update=update, subscriptions=subs }
