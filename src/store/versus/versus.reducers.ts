import {IVersusState, LOAD_ALL, LOAD_VERSUS, TVersusActions} from "./versus.types";
import {TStatus} from "../app.types";

const InitState: IVersusState = {
    all: {
        status: TStatus.Empty,
        data: [],
    },
    versus: {
        status: TStatus.Empty,
        data: null,
    }
};

function VersusReducers(
    state: IVersusState = InitState,
    action: TVersusActions): IVersusState {

    switch (action.type) {
        case LOAD_VERSUS:
            return {
                ...state,
                versus: {
                    status: TStatus.Loaded,
                    data: action.payload
                }
            };

        case LOAD_ALL:
            return {
                ...state,
                all: {
                    status: TStatus.Loaded,
                    data: action.payload
                }
            };

        default:
            return state;
    }
}

export default VersusReducers;
