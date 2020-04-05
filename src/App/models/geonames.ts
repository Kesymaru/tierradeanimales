export enum GeonamesTypes {
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
  type: typeof GeonamesTypes.FETCH_COUNTRIES;
}

interface ErrorCountries {
  type: typeof GeonamesTypes.ERROR_COUNTRIES;
  payload: Error | string;
}

interface LoadCountries {
  type: typeof GeonamesTypes.LOAD_COUNTRIES;
  payload: any[];
}

// ------------------------------------
// States
// ------------------------------------
interface FetchStates {
  type: typeof GeonamesTypes.FETCH_STATES;
}

interface ErrorStates {
  type: typeof ERROR_STATES;
  payload: Error | string;
}

interface LoadStates {
  type: typeof GeonamesTypes.ERROR_STATES;
  payload: any[];
}

// ------------------------------------
// Counties
// ------------------------------------
interface FetchCounties {
  type: typeof GeonamesTypes.FETCH_COUNTIES;
}

interface ErrorCounties {
  type: typeof GeonamesTypes.ERROR_COUNTIES;
  payload: Error | string;
}

interface LoadCounties {
  type: typeof GeonamesTypes.FETCH_COUNTIES;
  payload: any[];
}

// ------------------------------------
// City
// ------------------------------------
interface FetchCities {
  type: typeof GeonamesTypes.FETCH_CITIES;
}

interface ErrorCities {
  type: typeof GeonamesTypes.ERROR_CITIES;
  payload: Error | string;
}

interface LoadCities {
  type: typeof GeonamesTypes.LOAD_CITIES;
  payload: any[];
}

// ------------------------------------
// Geonames Actions
// ------------------------------------
type GeonamesAction =
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
