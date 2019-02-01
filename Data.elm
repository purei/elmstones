module Data exposing (..)

type alias Kit =
  { commander: Commander
  , deck: Deck
  }
emptyKit = Kit emptyCommander emptyDeck
type alias Deck = List Unit
emptyDeck = []

type alias Commander = -- Health and Skills
  { health: Int
  }
emptyCommander = Commander 1

type alias Unit = -- Base stats given id and upgrade level and Rune
  { attack: Int
  , health: Int
  , delay: Int
  }
emptyUnit = Unit 0 1 0


--type Focus = Faction Faction | Race Race | Anyone

--type Who = Friendly | Opponent
--type Which = Any | Active | Hurt | Only | Adjacent | AndAdjacent | Fixed Int
  -- can't do combinations this way
--type Target = Target Who Which
