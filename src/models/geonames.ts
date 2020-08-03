import { Action } from "redux";

import { State } from "../models/store";

export enum GeonamesTypes {
  FETCH_COUNTRIES = "FETCH_COUNTRIES",
  ERROR_COUNTRIES = "ERROR_COUNTRIES",
  LOAD_COUNTRIES = "LOAD_COUNTRIES",
  FETCH_STATES = "FETCH_STATES",
  ERROR_STATES = "ERROR_STATES",
  LOAD_STATES = "LOAD_STATES",
  FETCH_COUNTIES = "FETCH_COUNTIES",
  ERROR_COUNTIES = "ERROR_COUNTIES",
  LOAD_COUNTIES = "LOAD_COUNTIES",
  FETCH_CITIES = "FETCH_CITIES",
  ERROR_CITIES = "ERROR_CITIES",
  LOAD_CITIES = "LOAD_CITIES",
}

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

export interface GeonamesCountriesState extends State<Array<GeonamesCountry>> {}
export interface GeonamesStatesState extends State<Array<GeonamesChildren>> {}
export interface GeonamesCountiesState extends State<Array<GeonamesChildren>> {}
export interface GeonamesCitiesState extends State<Array<GeonamesChildren>> {}

export interface GeonamesState {
  countries: GeonamesCountriesState;
  states: GeonamesStatesState;
  counties: GeonamesCountiesState;
  cities: GeonamesCitiesState;
}

// ------------------------------------
// FlagCountries
// ------------------------------------
interface FetchCountries extends Action<GeonamesTypes.FETCH_COUNTRIES> {
  // type: typeof GeonamesTypes.FETCH_COUNTRIES;
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
  type: typeof GeonamesTypes.ERROR_STATES;
  payload: Error | string;
}

interface LoadStates extends Action<GeonamesTypes.LOAD_STATES> {
  // type: typeof GeonamesTypes.LOAD_STATES;
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

interface LoadCounties extends Action<GeonamesTypes.LOAD_COUNTIES> {
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
export type GeonamesAction =
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

export default GeonamesState;