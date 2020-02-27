import IHomeState, {IHomeActions} from "./homes.types";
import {TStatus} from "../app.types";

const InitState: IHomeState = {
    homes: {
        status: TStatus.Empty,
        data: [],
        pagination: {
            count: 0,
            rowPerPage: 0,
            page: 0,
        }
    },
    home: {
        status: TStatus.Empty,
        data: null,
        id: null,
    },
};

function HomesReducers(
    state: IHomeState = InitState,
    action: IHomeActions): IHomeState {
    switch (action.type) {
        // ------------------------------------
        // Dashboard
        // ------------------------------------
        case "FETCH_HOME":
            return {
                ...state, home: {
                    ...InitState.home,
                    status: TStatus.Fetching,
                }
            };

        case "LOAD_HOME": {
            return {
                ...state, home: {
                    status: TStatus.Loaded,
                    data: action.payload,
                    id: action.payload.id,
                }
            };
        }

        case "ERROR_HOME":
            return {
                ...state, home: {
                    ...InitState.home,
                    status: TStatus.Error,
                    error: action.payload,
                }
            };

        // ------------------------------------
        // Homes
        // ------------------------------------
        case "FETCH_HOMES":
            return {...state, homes: InitState.homes};

        case "LOAD_HOMES":
            return {
                ...state, homes: {
                    ...action.payload,
                    status: TStatus.Loaded,
                }
            };

        case "ERROR_HOMES":
            return {
                ...state, homes: {
                    ...InitState.homes,
                    status: TStatus.Error,
                    error: action.payload,
                }
            };

        default:
            return state;
    }
}

export default HomesReducers;
