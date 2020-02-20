import {IAppStateItem, IAppStateItems} from "../app.types";

export interface IGeonames {
    continent: string;
    capital: string;
    languages: "string";
    geonameId: number;
    south: number;
    isoAlpha3: string;
    north: number;
    fipsCode: string;
    population: string;
    east: number;
    isoNumeric: string;
    areaInSqKm: "string";
    countryCode: string;
    west: number;
    countryName: "string";
    continentName: string;
    currencyCode: string;
}

export interface IGeonamesResult {
    geonames: any[];
}

export default interface IGeonamesState {
    country: IAppStateItem<IGeonames>;
    states: IAppStateItems<IGeonames>;
    counties: IAppStateItems<IGeonames>;
    cities: IAppStateItems<IGeonames>;
}

// ------------------------------------
// Country
// ------------------------------------
export const FETCH_COUNTRY = 'FETCH_COUNTRY';
interface IFetchCountry {
    type: typeof FETCH_COUNTRY;
}

export const ERROR_COUNTRY = 'ERROR_COUNTRY';
interface IErrorCountry {
    type: typeof ERROR_COUNTRY;
    payload: Error | string;
}

export const LOAD_COUNTRY = 'LOAD_COUNTRY';
interface ILoadCountry {
    type: typeof LOAD_COUNTRY;
    payload: any;
}

// ------------------------------------
// States
// ------------------------------------
export const FETCH_STATES = 'FETCH_STATES';
interface IFetchStates {
    type: typeof FETCH_STATES;
}

export const ERROR_STATES = 'ERROR_STATES';
interface IErrorStates {
    type: typeof ERROR_STATES;
    payload: Error | string;
}

export const LOAD_STATES = 'LOAD_STATES';
interface ILoadStates {
    type: typeof LOAD_STATES;
    payload: any[];
}

// ------------------------------------
// Counties
// ------------------------------------
export const FETCH_COUNTIES = 'FETCH_COUNTIES';
interface IFetchCounties {
    type: typeof FETCH_COUNTIES;
}

export const ERROR_COUNTIES = 'ERROR_COUNTIES';
interface IErrorCounties {
    type: typeof ERROR_COUNTIES;
    payload: Error | string;
}

export const LOAD_COUNTIES = 'LOAD_COUNTIES';
interface ILoadCounties {
    type: typeof LOAD_COUNTIES;
    payload: any[];
}

// ------------------------------------
// City
// ------------------------------------
export const FETCH_CITIES = 'FETCH_CITIES';
interface IFetchCities {
    type: typeof FETCH_CITIES;
}

export const ERROR_CITIES = 'ERROR_CITIES';
interface IErrorCities {
    type: typeof ERROR_CITIES;
    payload: Error | string;
}

export const LOAD_CITIES = 'LOAD_CITIES';
interface ILoadCities {
    type: typeof LOAD_CITIES;
    payload: any[];
}


// ------------------------------------
// Geonames Actions
// ------------------------------------
export type IGeonamesActions =
    IFetchCountry |
    IErrorCountry |
    ILoadCountry |

    IFetchStates |
    IErrorStates |
    ILoadStates |

    IFetchCounties |
    IErrorCounties |
    ILoadCounties |

    IFetchCities |
    IErrorCities |
    ILoadCities
    ;
