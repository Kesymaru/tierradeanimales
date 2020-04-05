export interface GeonamesCountry {
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

export interface GeonamesChildren {
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

export interface GeonamesResult<T> {
  geonames: T[];
  totalResultsCount?: number;
}

export interface GeonamesState {
  countries: AppStateItems<IGeonamesCountry>;
  states: AppStateItems<IGeonamesChildren>;
  counties: AppStateItems<IGeonamesChildren>;
  cities: AppStateItems<IGeonamesChildren>;
}

export enum ActionType {
  FETCH_COUNTRIES,
  ERROR_COUNTRIES,
  LOAD_COUNTRIES,
  FETCH_STATES,
  ERROR_STATES,
  LOAD_STATES,
  FETCH_COUNTIES,
  ERROR_COUNTIES,
  LOAD_COUNTIES,
  FETCH_CITIES,
  ERROR_CITIES,
  LOAD_CITIES,
}

// ------------------------------------
// FlagCountries
// ------------------------------------
interface FetchCountries {
  type: typeof ActionType.FETCH_COUNTRIES;
}

interface ErrorCountries {
  type: typeof ActionType.ERROR_COUNTRIES;
  payload: Error | string;
}

interface LoadCountries {
  type: typeof ActionType.LOAD_COUNTRIES;
  payload: any[];
}

// ------------------------------------
// States
// ------------------------------------
interface FetchStates {
  type: typeof ActionType.FETCH_STATES;
}

interface ErrorStates {
  type: typeof ERROR_STATES;
  payload: Error | string;
}

interface LoadStates {
  type: typeof ActionType.ERROR_STATES;
  payload: any[];
}

// ------------------------------------
// Counties
// ------------------------------------
interface FetchCounties {
  type: typeof ActionType.FETCH_COUNTIES;
}

interface ErrorCounties {
  type: typeof ActionType.ERROR_COUNTIES;
  payload: Error | string;
}

interface LoadCounties {
  type: typeof ActionType.FETCH_COUNTIES;
  payload: any[];
}

// ------------------------------------
// City
// ------------------------------------
interface FetchCities {
  type: typeof ActionType.FETCH_CITIES;
}

interface ErrorCities {
  type: typeof ActionType.ERROR_CITIES;
  payload: Error | string;
}

interface LoadCities {
  type: typeof ActionType.LOAD_CITIES;
  payload: any[];
}

// ------------------------------------
// Geonames Actions
// ------------------------------------
type Actions =
  | FetchCountries
  | ErrorCountries
  | LoadCountries
  | FetchStates
  | ErrorStates
  | LoadStates
  | FetchCounties
  | ErrorCounties
  | LoadCounties
  | FetchCities
  | ErrorCities
  | LoadCities;
