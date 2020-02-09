import {IDogState, TDogsActions} from "./dogs.types";
import {TStatus} from "../app.types";

const InitState: IDogState = {
    dogs: {
        status: TStatus.Empty,
        data: [],
        pagination: {
            page: 0,
            count: 0,
            rowPerPage: 5,
        }
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
        // ------------------------------------
        // Dog
        // ------------------------------------
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

        // ------------------------------------
        // Dogs
        // ------------------------------------
        case "FETCH_DOGS":
            return {...state, dogs: {
                    ...InitState.dogs,
                    status: TStatus.Fetching,
                }};

        case "LOAD_DOGS":
            return {...state, dogs: {
                    ...action.payload,
                    status: TStatus.Loaded,
                }};

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
