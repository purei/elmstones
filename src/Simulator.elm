port module Simulator exposing (init)

{-| okay

#okay

@docs init

-}

import Battle exposing (ExternalMsg(..))
import Json.Decode exposing (Decoder, int, maybe, succeed)
import Json.Decode.Pipeline exposing (optional, required)
import Random.Pcg.Extended as Random exposing (Generator)
import Task
import Time



--import Time


type alias Matchup =
    Battle.Config


{-| Simulation receives matchup, seed and the number of runs.
-}
type alias Simulation =
    { matchup : Matchup
    , seed : Maybe Int
    , runs : Maybe Int
    }


type State
    = Idle
    | Matchup Matchup
    | Simulating Matchup Battle.Context


type alias AttackerWon =
    Bool


type Outcome
    = Outcome Matchup Battle.Log AttackerWon


type alias Model =
    { state : State
    , log : List Outcome
    , seed : Maybe Random.Seed
    , runsRemaining : Int
    , runs : Int
    }


type Msg
    = SimulationRequest Json.Decode.Value
    | BattleMsg Battle.Msg
    | InitBattle Matchup Battle.Seeds
    | MaybeEndSimulation


main : Program () Model Msg
main =
    Platform.worker { init = init, update = update, subscriptions = subscriptions }


{-| init
-}
init : flags -> ( Model, Cmd Msg )
init _ =
    ( Model Idle [] Nothing 0 0, Cmd.none )


decoder : Decoder Simulation
decoder =
    succeed Simulation
        |> required "matchup" Battle.matchupDecoder
        |> optional "seed" (maybe int) Nothing
        |> optional "runs" (maybe int) Nothing


goto : Msg -> Cmd Msg
goto x =
    Task.perform identity (Task.succeed x)


json_parse_error =
    Debug.log "Count not parse JSON: "


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        doNothing =
            ( model, Cmd.none )
    in
    case ( msg, model.state ) of
        ( SimulationRequest value, _ ) ->
            case Json.Decode.decodeValue decoder value of
                Ok simulation ->
                    initSimulation simulation

                Err error_msg ->
                    let
                        _ =
                            json_parse_error error_msg
                    in
                    doNothing

        ( BattleMsg battle_msg, Simulating matchup battle ) ->
            let
                ( new_battle, battle_cmd, extmsg ) =
                    Battle.update battle_msg battle
            in
            case extmsg of
                Battle.EndBattle ->
                    endBattle matchup new_battle model

                _ ->
                    continueBattle matchup ( new_battle, battle_cmd ) model

        ( InitBattle matchup seeds, _ ) ->
            let
                ( battle, cmd ) =
                    Battle.init matchup seeds
            in
            ( { model | state = Simulating matchup battle }, Cmd.map BattleMsg cmd )

        ( MaybeEndSimulation, Matchup matchup ) ->
            if runsRemaining model then
                prepareRun model matchup

            else
                let
                    wins =
                        model.log
                            |> List.filter attackerWon
                            |> List.length
                in
                ( model, simulationStats (Stats wins model.runs) )

        -- Trying to deal with a Battle msg when not in a 'simulating' state is not possible
        ( BattleMsg _, _ ) ->
            doNothing

        -- Trying to end Simulation when not in a 'matchup' state is not possible
        ( MaybeEndSimulation, _ ) ->
            doNothing


attackerWon : Outcome -> Bool
attackerWon (Outcome _ _ won) =
    won


runsRemaining : Model -> Bool
runsRemaining model =
    model.runsRemaining > 0


endBattle : Matchup -> Battle.Context -> Model -> ( Model, Cmd Msg )
endBattle matchup battle_end model =
    let
        attacker_won =
            remainderBy 2 battle_end.turn == 1

        new_outcome =
            Outcome matchup battle_end.log attacker_won

        new_log =
            new_outcome :: model.log
    in
    ( Model (Matchup matchup) new_log model.seed (model.runsRemaining - 1) model.runs
    , goto MaybeEndSimulation
    )


continueBattle : Matchup -> ( Battle.Context, Cmd Battle.Msg ) -> Model -> ( Model, Cmd Msg )
continueBattle matchup ( battle, battle_cmd ) model =
    ( { model | state = Simulating matchup battle }, Cmd.map BattleMsg battle_cmd )


initSimulation : Simulation -> ( Model, Cmd Msg )
initSimulation { matchup, seed, runs } =
    let
        seed_ =
            seed |> Maybe.map (\x -> Random.initialSeed x [])

        num_runs =
            runs |> Maybe.withDefault 1
    in
    ( Model (Matchup matchup) [] seed_ num_runs num_runs, goto MaybeEndSimulation )


seedsCmd : Maybe Random.Seed -> Matchup -> ( Cmd Msg, Maybe Random.Seed )
seedsCmd seed matchup =
    case seed of
        Nothing ->
            ( generate (InitBattle matchup) Battle.seedsGenerator, Nothing )

        Just seed_ ->
            let
                ( seeds, new_seed ) =
                    Random.step Battle.seedsGenerator seed_
            in
            ( goto <| InitBattle matchup seeds, Just new_seed )


generate : (a -> msg) -> Generator a -> Cmd msg
generate toMsg generator =
    Time.now
        |> Task.map
            (Time.posixToMillis >> (\x -> Random.initialSeed x []) >> Random.step generator >> Tuple.first)
        |> Task.perform toMsg


prepareRun : Model -> Matchup -> ( Model, Cmd Msg )
prepareRun model matchup =
    let
        ( initCmd, new_seed ) =
            seedsCmd model.seed matchup
    in
    ( { model | seed = new_seed }, initCmd )



-- Subscriptions


port initSim : (Json.Decode.Value -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch [ initSim SimulationRequest ]



-- Publishers


type alias Stats =
    { wins : Int
    , attempts : Int
    }


port simulationStats : Stats -> Cmd msg
