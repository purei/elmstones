module Unit exposing (..)

import Data


type alias Config =
    Data.Card


type alias Context =
    { damage_taken : Int
    , countdown : Int
    , turn_played : Int
    }


type alias Unit =
    { config : Config
    , context : Context
    }


init : Config -> Int -> Unit
init base turn =
    { config = base
    , context = initContext base turn
    }


initContext config turn =
    Context 0 config.delay turn


apply : (Context -> Context) -> Unit -> Unit
apply applyFunction unit =
    { unit | context = applyFunction unit.context }



-- getters


attack unit =
    unit.config.attack


maxHealth unit =
    unit.config.health


delay unit =
    unit.config.delay


damageTaken unit =
    unit.context.damage_taken


countdown unit =
    unit.context.countdown



-- unit setters


reduceDelay =
    apply (\unit -> { unit | countdown = unit.countdown - 1 })


damage amt =
    apply (\unit -> { unit | damage_taken = unit.damage_taken + 1 })



-- queries


isAlive unit =
    damageTaken unit < maxHealth unit


isActive unit =
    countdown unit <= 0


canMelee unit =
    attack unit > 0
