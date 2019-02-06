module Hero
    exposing
        ( Hero
        , init
        , damage
        , isAlive
        )

import Data


type alias Config =
    Data.Hero


type alias Context =
    { damage_taken : Int
    }


type alias Hero =
    { config : Config
    , context : Context
    }


init : Config -> Hero
init base =
    Hero base (Context 0)



-- hero getters


isAlive hero =
    hero.context.damage_taken < hero.config.health



-- hero setters


damage : Int -> Hero -> Hero
damage amt =
    apply (addDamageTaken amt)



-- apply mutation to hero's context


apply : (context -> context) -> { a | context : context } -> { a | context : context }
apply setFunction hero =
    { hero | context = setFunction hero.context }



-- context setters


addDamageTaken : Int -> Context -> Context
addDamageTaken amt context =
    { context | damage_taken = context.damage_taken + amt }
