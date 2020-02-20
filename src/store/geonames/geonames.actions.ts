import {Dispatch} from "redux";

import Geonames from 'geonames.js';
import {
    ERROR_CITIES,
    ERROR_COUNTIES,
    ERROR_STATES,
    FETCH_CITIES,
    FETCH_COUNTIES,
    FETCH_COUNTRY,
    FETCH_STATES,
    IGeonames,
    IGeonamesActions,
    LOAD_CITIES,
    LOAD_COUNTIES,
    LOAD_STATES
} from "./geonames.types";

// ------------------------------------
// Config
// ------------------------------------
const geonames = new Geonames({
    username: 'kesymaru',
    lan: 'en',
    encoding: 'JSON'
});

// ------------------------------------
// Country
// ------------------------------------
function FetchCountry(): IGeonamesActions {
    return {type: FETCH_COUNTRY, payload};
}

function LoadCountry(payload: IGeonames): IGeonamesActions {
    return {type: LOAD_COUNTIES, payload};
}

export function GetCountry(country: string = 'CR'): Function {
    return async (dispatch: Dispatch) => {
        try {
            await dispatch(FetchCountry());
            const results = await geonames.countryInfo({country});
            if (results.length) {
                dispatch(LoadCountry(results[0]));
            }
        } catch (error) {

        }
    }
}

// ------------------------------------
// States
// ------------------------------------
function FetchStates(): IGeonamesActions {
    return {type: FETCH_STATES};
}

function LoadStates(payload: IGeonames[]): IGeonamesActions {
    return {type: LOAD_STATES, payload}
}

function ErrorStates(payload: Error): IGeonamesActions {
    return {type: ERROR_STATES, payload}
}

export function GetStates(country: IGeonames): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchStates());
            const states = await geonames.children({geonameId: country.geonameId});
            dispatch(LoadStates(states.geonames));
        } catch (error) {
            dispatch(ErrorStates(error));
        }
    }
}

// ------------------------------------
// Counties
// ------------------------------------
function FetchCounties(): IGeonamesActions {
    return {type: FETCH_COUNTIES};
}

function LoadCounties(payload: IGeonames[]): IGeonamesActions {
    return {type: LOAD_COUNTIES, payload}
}

function ErrorCounties(payload: Error): IGeonamesActions {
    return {type: ERROR_COUNTIES, payload}
}

export function GetCounties(state: IGeonames): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchCounties());
            const counties = await geonames.children({geonameId: state.geonameId});
            dispatch(LoadCounties(counties.geonames));
        } catch (error) {
            dispatch(ErrorCounties(error));
        }
    }
}

// ------------------------------------
// Cities
// ------------------------------------
function FetchCities(): IGeonamesActions {
    return {type: FETCH_CITIES};
}

function LoadCities(payload: IGeonames[]): IGeonamesActions {
    return {type: LOAD_CITIES, payload}
}

function ErrorCities(payload: Error): IGeonamesActions {
    return {type: ERROR_CITIES, payload}
}

export function GetCities(county: IGeonames): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchCities());
            const cities = await geonames.children({geonameId: county.geonameId});
            dispatch(LoadCities(cities.geonames));
        } catch (error) {
            dispatch(ErrorCities(error));
        }
    }
}
