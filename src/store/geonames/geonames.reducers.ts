import IGeonamesState, {IGeonamesActions} from "./geonames.types";
import {TStatus} from "../app.types";

const InitState: IGeonamesState = {
    country: {
        status: TStatus.Empty,
        data: null,
        id: null,
    },
    states: {
        status: TStatus.Empty,
        data: [],
    },
    counties: {
        status: TStatus.Empty,
        data: [],
    },
    cities: {
        status: TStatus.Empty,
        data: [],
    },
};

function GeonamesReducers(
    state: IGeonamesState = InitState,
    action: IGeonamesActions
): IGeonamesState {
    switch (action.type) {
        // ------------------------------------
        // Country
        // ------------------------------------
        case "FETCH_COUNTRY":
            return {
                ...state, country: {
                    ...InitState.country,
                    status: TStatus.Fetching,
                }
            };
        case "ERROR_COUNTRY":
            return {
                ...state, country: {
                    ...InitState.country,
                    status: TStatus.Error,
                    error: action.payload,
                }
            };
        case "LOAD_COUNTRY":
            return {
                ...state, country: {
                    status: TStatus.Loaded,
                    data: action.payload,
                    id: action.payload.geonameId,
                }
            };

        // ------------------------------------
        // States
        // ------------------------------------
        case "FETCH_STATES":
            return {
                ...state, states: {
                    ...InitState.states,
                    status: TStatus.Fetching,
                }
            };
        case "ERROR_STATES":
            return {
                ...state, states: {
                    ...InitState.states,
                    status: TStatus.Error,
                    error: action.payload,
                }
            };
        case "LOAD_STATES":
            return {
                ...state, states: {
                    status: TStatus.Loaded,
                    data: action.payload,
                }
            };

        // ------------------------------------
        // Counties
        // ------------------------------------
        case "FETCH_COUNTIES":
            return {
                ...state, counties: {
                    ...InitState.counties,
                    status: TStatus.Fetching,
                }
            };
        case "ERROR_COUNTIES":
            return {
                ...state, counties: {
                    ...InitState.counties,
                    status: TStatus.Error,
                    error: action.payload,
                }
            };
        case "LOAD_COUNTIES":
            return {
                ...state, counties: {
                    status: TStatus.Loaded,
                    data: action.payload,
                }
            };

        // ------------------------------------
        // Cities
        // ------------------------------------
        case "FETCH_CITIES":
            return {
                ...state, cities: {
                    ...InitState.cities,
                    status: TStatus.Fetching,
                }
            };
        case "ERROR_CITIES":
            return {
                ...state, cities: {
                    ...InitState.cities,
                    status: TStatus.Error,
                    error: action.payload,
                }
            };
        case "LOAD_CITIES":
            return {
                ...state, cities: {
                    status: TStatus.Loaded,
                    data: action.payload,
                }
            };

        default:
            return state;
    }
}
