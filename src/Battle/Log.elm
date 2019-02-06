module Battle.Log exposing (Event(..), Log)

import Data exposing (Card)


type alias Log =
    List Event


type Event
    = IncrementTurn Int
    | DrawCard Card
    | PlayCard Card
    | ReduceDelay
    | HeroDamage Int
    | AttackDamage Int
    | ClearDead
    | EndBattle
