module Battle.Report exposing (Spectator, Participant, Omniscient, Input)

import Battle.Army as Army exposing (Army)
import Data exposing (Card)

-- import Player
-- import Hand

type alias Input = (Army, List Card, List Card)

-- you can see only what's on the table
type alias Spectator =
  { hand: Int
  , deck_remaining: Int
  , army: Army
  }

-- you can see a player's hand
type alias Participant =
  { hand: List Card
  , deck_remaining: Int
  , army: Army
  }

-- you can see the person's hand and their facedown deck
type alias Omniscient =
  { hand: List Card
  , deck_remaining: List Card
  , army: Army
  }

--
-- agent : Player -> Agent
-- agent player =
--   { hand = Hand.cards player.context.hand
--   , deck_remaining = Deck.cardsLeft player.context.deck
--   , army = Player.army player
--   }
