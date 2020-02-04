import {IDogState, TDogsActions} from "./dogs.types";
import {TStatus} from "../app.types";

const InitState: IDogState = {
    dogs: {
        status: TStatus.Empty,
        data: [],
    },
    dog: {
        status: TStatus.Empty,
        data: null,
    }
};

function DogsReducers(
    state: IDogState = InitState,
    action: TDogsActions): IDogState {

    switch (action.type) {
        case "REQUEST_DOG":
            return Object.assign({}, state, {
                dog: {
                    status: TStatus.Fetching,
                    data: null,
                }
            });

        case "LOAD_DOG":
            return Object.assign({}, state, {
                dog: {
                    status: TStatus.Loaded,
                    data: action.payload,
                },
                dogs: InitState.dogs
            });

        case "REQUEST_DOGS":
            return Object.assign({}, state, {
                dogs: {
                    status: TStatus.Fetching,
                    data: [],
                }
            });

        case "LOAD_DOGS":
            return Object.assign({}, state, {
                dogs: {
                    status: TStatus.Loaded,
                    data: action.payload,
                }
            });

        default:
            return state;
    }
}

export default DogsReducers;
