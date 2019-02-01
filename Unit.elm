module Unit exposing (..)

import Data

type alias Unit =
  { base: Data.Unit
  , damage_taken: Int
  , countdown: Int
  }

init base = Unit base 0 base.delay

reduceDelay unit = { unit | countdown = unit.countdown - 1 }
reduceHealth amt unit = { unit | damage_taken = unit.damage_taken + amt }

isAlive unit = unit.damage_taken < unit.base.health
isActive unit = unit.countdown <= 0
