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
        id: null,
    }
};

function DogsReducers(
    state: IDogState = InitState,
    action: TDogsActions): IDogState {
    switch (action.type) {
        case "FETCH_DOG":
            return Object.assign({}, state, {
                dog: {
                    status: TStatus.Fetching,
                    data: null,
                    id: null,
                }
            });

        case "LOAD_DOG":
            return Object.assign({}, state, {
                dog: {
                    status: TStatus.Loaded,
                    data: action.payload,
                    id: action.payload.id,
                },
                dogs: InitState.dogs
            });

        case "DELETE_DOG":
            return Object.assign({}, state, {
                dog: InitState.dog
            });

        case "FETCH_DOGS":
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

        case "ERROR_DOGS":
            return Object.assign({}, state, {
                dogs: {
                    status: TStatus.Error,
                    data: [],
                    error: action.payload
                }
            });

        default:
            return state;
    }
}

export default DogsReducers;
