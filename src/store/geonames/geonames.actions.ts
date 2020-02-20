import {Dispatch} from "redux";

import Geonames from 'geonames.js';
import {
    ERROR_CITIES,
    ERROR_COUNTIES,
    ERROR_COUNTRY,
    ERROR_STATES,
    FETCH_CITIES,
    FETCH_COUNTIES,
    FETCH_COUNTRY,
    FETCH_STATES,
    IGeonames,
    IGeonamesActions,
    IGeonamesResult,
    LOAD_CITIES,
    LOAD_COUNTIES,
    LOAD_COUNTRY,
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
    return {type: FETCH_COUNTRY};
}

function ErrorCountry(payload: Error): IGeonamesActions {
    return {type: ERROR_COUNTRY, payload};
}

function LoadCountry(payload: any): IGeonamesActions {
    return {type: LOAD_COUNTRY, payload};
}

export function GetCountry(country: string = 'CR'): Function {
    console.log('get country', country);
    return async (dispatch: Dispatch) => {
        try {
            await dispatch(FetchCountry());
            const countries = await geonames.countryInfo({country}) as IGeonamesResult;
            if (countries.geonames.length) {
                dispatch(LoadCountry(countries.geonames[0]));
            }
        } catch (error) {
            dispatch(ErrorCountry(error));
        }
    }
}

// ------------------------------------
// States
// ------------------------------------
function FetchStates(): IGeonamesActions {
    return {type: FETCH_STATES};
}

function ErrorStates(payload: Error): IGeonamesActions {
    return {type: ERROR_STATES, payload}
}

function LoadStates(payload: any[]): IGeonamesActions {
    return {type: LOAD_STATES, payload}
}

export function GetStates(country: any): Function {
    console.log('GetStates', country);
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchStates());
            const states = await geonames.children({geonameId: country.geonameId}) as IGeonamesResult;
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

function ErrorCounties(payload: Error): IGeonamesActions {
    return {type: ERROR_COUNTIES, payload}
}

function LoadCounties(payload: any[]): IGeonamesActions {
    return {type: LOAD_COUNTIES, payload}
}

export function GetCounties(state: any): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchCounties());
            const counties = await geonames.children({geonameId: state.geonameId}) as IGeonamesResult;
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

function ErrorCities(payload: Error): IGeonamesActions {
    return {type: ERROR_CITIES, payload}
}

function LoadCities(payload: any[]): IGeonamesActions {
    return {type: LOAD_CITIES, payload}
}

export function GetCities(county: any): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchCities());
            const cities = await geonames.children({geonameId: county.geonameId}) as IGeonamesResult;
            dispatch(LoadCities(cities.geonames));
        } catch (error) {
            dispatch(ErrorCities(error));
        }
    }
}
