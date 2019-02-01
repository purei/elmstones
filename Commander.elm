module Commander exposing (..)

import Data

type alias Commander =
  { base: Data.Commander
  , damage_taken: Int
  }

init base = Commander base 0

reduceHealth amt commander = { commander | damage_taken = commander.damage_taken + amt }

isAlive commander = commander.damage_taken > 0
