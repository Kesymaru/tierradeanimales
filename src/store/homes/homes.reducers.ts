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

function HomeReducers(
    state: IHomeState = InitState,
    action: IHomeActions): IHomeActions {
    switch (action.type) {
        // ------------------------------------
        // Home
        // ------------------------------------
        case "FETCH_HOME":
            return {
                ...state, [`home`]: InitState.home
            };

        case "LOAD_HOME": {
            return {
                ...state, [`home`]: {
                    status: TStatus.Fetching,
                    data: action.payload,
                    id: action.payload.id,
                }
            };
        }

        case "ERROR_HOME":
            return {
                ...state, [`home`]: {
                    ...InitState.home,
                    status: TStatus.Error,
                    error: action.payload,
                }
            };

        // ------------------------------------
        // Homes
        // ------------------------------------
        case "FETCH_HOMES":
            return {...state, [`homes`]: InitState.homes};

        case "LOAD_HOMES":
            return {
                ...state, [`homes`]: {
                    ...action.payload,
                    status: TStatus.Loaded,
                }
            };

        case "ERROR_HOMES":
            return {
                ...state, [`homes`]: {
                    status: TStatus.Error,
                    data: [],
                    error: action.payload,
                }
            };

        default:
            return state;
    }
}

export default HomeReducers;
