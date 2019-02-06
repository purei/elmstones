module Battle.Army exposing
    ( Army
    , addUnit
    , applyHero
    , applyUnit
    , applyUnits
    , clearDead
    , hero
    , init
    , numUnits
    , unit
    , units
    )

import Array exposing (Array)
import Data exposing (Card)
import Hero exposing (Hero)
import Unit exposing (Unit)


type alias Army =
    { hero : Hero
    , units : Array Unit
    }


init : Data.Hero -> Army
init hero_data =
    { hero = Hero.init hero_data
    , units = Array.empty
    }


hero : Army -> Hero
hero army =
    army.hero


unit : Int -> Army -> Maybe Unit
unit pos army =
    Array.get pos army.units


units : Army -> List Unit
units army =
    Array.toList army.units


numUnits : Army -> Int
numUnits army =
    Array.length army.units


applyHero : (Hero -> Hero) -> Army -> Army
applyHero heroFunction army =
    { army | hero = heroFunction army.hero }


applyUnit : Int -> (Unit -> Unit) -> Army -> Army
applyUnit position unitFunction army =
    case Array.get position army.units of
        Nothing ->
            army

        Just unit_ ->
            { army | units = Array.set position (unitFunction unit_) army.units }


applyUnits : (Unit -> Unit) -> Army -> Army
applyUnits mapFunction army =
    { army | units = Array.map mapFunction army.units }


clearDead : Army -> Army
clearDead army =
    { army | units = Array.filter Unit.isAlive army.units }


addUnit : Card -> Int -> Army -> Army
addUnit card id army =
    { army | units = Array.push (Unit.init card id) army.units }
