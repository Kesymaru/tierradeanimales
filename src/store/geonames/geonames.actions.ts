import {Dispatch} from "redux";

import Geonames from 'geonames.js';
import {
    ERROR_CITIES,
    ERROR_COUNTIES,
    ERROR_COUNTRIES,
    ERROR_STATES,
    FETCH_CITIES,
    FETCH_COUNTIES,
    FETCH_COUNTRIES,
    FETCH_STATES,
    IGeonamesChildren,
    IGeonamesCountry,
    IGeonamesActions,
    IGeonamesResult,
    LOAD_CITIES,
    LOAD_COUNTIES,
    LOAD_COUNTRIES,
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
function FetchCountries(): IGeonamesActions {
    return {type: FETCH_COUNTRIES};
}

function ErrorCountries(payload: Error): IGeonamesActions {
    return {type: ERROR_COUNTRIES, payload};
}

function LoadCountries(payload: IGeonamesCountry[]): IGeonamesActions {
    return {type: LOAD_COUNTRIES, payload};
}

async function RequestCountries(): Promise<IGeonamesCountry[]> {
    const results = await geonames.countryInfo() as IGeonamesResult<IGeonamesCountry>;
    return results.geonames;
}

export function GetCountries(): Function {
    return async (dispatch: Dispatch) => {
        try {
            await dispatch(FetchCountries());
            const countries = await RequestCountries();
            dispatch(LoadCountries(countries));
        } catch (error) {
            dispatch(ErrorCountries(error));
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

async function RequestStates(country: IGeonamesCountry): Promise<IGeonamesChildren[]> {
    const states = await geonames.children({geonameId: country.geonameId}) as IGeonamesResult<IGeonamesChildren>;
    return states.geonames;
}

export function GetStates(country: any): Function {
    console.log('GetStates', country);
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchStates());
            const states = await RequestStates(country);
            dispatch(LoadStates(states));
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
            const counties = await geonames.children({geonameId: state.geonameId}) as IGeonamesResult<IGeonamesChildren>;
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
            const cities = await geonames.children({geonameId: county.geonameId}) as IGeonamesResult<IGeonamesChildren>;
            dispatch(LoadCities(cities.geonames));
        } catch (error) {
            dispatch(ErrorCities(error));
        }
    }
}
