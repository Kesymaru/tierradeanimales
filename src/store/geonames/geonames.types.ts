import {IAppStateItems} from "../app.types";

export interface IGeonamesCountry {
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
    icon?: string;
}

export interface IGeonamesChildren {
    toponymName: string;
    name: string;
    lat: number;
    lng: number;
    geonameId: number;
    countryCode: string;
    countryName: string;
    fcl: string;
    fcode: string;
}

export interface IGeonamesResult<T> {
    geonames: T[];
    totalResultsCount?: number;
}

export default interface IGeonamesState {
    countries: IAppStateItems<IGeonamesCountry>;
    states: IAppStateItems<IGeonamesChildren>;
    counties: IAppStateItems<IGeonamesChildren>;
    cities: IAppStateItems<IGeonamesChildren>;
}

// ------------------------------------
// FlagCountries
// ------------------------------------
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';

interface IFetchCountries {
    type: typeof FETCH_COUNTRIES;
}

export const ERROR_COUNTRIES = 'ERROR_COUNTRIES';

interface IErrorCountries {
    type: typeof ERROR_COUNTRIES;
    payload: Error | string;
}

export const LOAD_COUNTRIES = 'LOAD_COUNTRIES';

interface ILoadCountries {
    type: typeof LOAD_COUNTRIES;
    payload: any[];
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
    IFetchCountries |
    IErrorCountries |
    ILoadCountries |

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
