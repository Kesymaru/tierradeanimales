import IGeonamesState, {IGeonamesActions} from "./geonames.types";

import {TStatus} from "../app.types";
import FlagCountries from "../../constants/countries";

const InitState: IGeonamesState = {
    countries: {
        status: TStatus.Empty,
        data: [],
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
        // Countries
        // ------------------------------------
        case "FETCH_COUNTRIES":
            return {
                ...state, countries: {
                    ...InitState.countries,
                    status: TStatus.Fetching,
                }
            };
        case "ERROR_COUNTRIES":
            return {
                ...state, countries: {
                    ...InitState.countries,
                    status: TStatus.Error,
                    error: action.payload,
                }
            };
        case "LOAD_COUNTRIES":
            return {
                ...state, countries: {
                    status: TStatus.Loaded,
                    data: action.payload.map(country => {
                        const flag = FlagCountries.find(f => f.name === country.countryName);
                        return {...country, icon: flag ? flag.icon : undefined}
                    }),
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

export default GeonamesReducers;
