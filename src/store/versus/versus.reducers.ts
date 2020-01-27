import {IVersusState, LOAD_VERSUS, TVersusActions} from "./versus.types";

const InitState: IVersusState = {
    versus: []
};

function VersusReducers(
    state: IVersusState = InitState,
    action: TVersusActions): IVersusState {

    switch (action.type) {
        case LOAD_VERSUS:
            return {
                ...state,
                versus: [...state.versus, action.payload]
            };

        default:
            return state;
    }
}

export default VersusReducers;
