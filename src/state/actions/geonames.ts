import Geonames from "geonames.js";
import { Dispatch } from "redux";

import {
  GeonamesAction,
  GeonamesTypes,
  GeonamesCountry,
  GeonamesChildren,
  GeonamesResult,
} from "@models/geonames";

// ------------------------------------
// Config
// ------------------------------------
const geonames = new Geonames({
  username: "kesymaru",
  lan: "en",
  encoding: "JSON",
});

// ------------------------------------
// Country
// ------------------------------------
function FetchCountries(): GeonamesAction {
  return { type: GeonamesTypes.FETCH_COUNTRIES };
}

function ErrorCountries(payload: Error): GeonamesAction {
  return { type: GeonamesTypes.ERROR_COUNTRIES, payload };
}

function LoadCountries(payload: GeonamesCountry[]): GeonamesAction {
  return { type: GeonamesTypes.LOAD_COUNTRIES, payload };
}

async function RequestChildren(
  parent: GeonamesChildren
): Promise<GeonamesChildren[]> {
  const children = (await geonames.children({
    geonameId: parent.geonameId,
  })) as GeonamesResult<GeonamesChildren>;
  return children.geonames;
}

async function RequestCountries(): Promise<GeonamesCountry[]> {
  const results = (await geonames.countryInfo()) as GeonamesResult<
    GeonamesCountry
  >;
  return results.geonames;
}

export function GetCountries(
  country?: GeonamesCountry | null,
  state?: GeonamesChildren | null,
  county?: GeonamesChildren | null
): Function {
  return async (dispatch: Dispatch) => {
    try {
      await dispatch(FetchCountries());
      const countries = await RequestCountries();
      dispatch(LoadCountries(countries));

      // await new Promise((resolve) => setTimeout(resolve, 5000));
      // dispatch(LoadCountries([]));

      /* if (country) {
        const states = await RequestStates(country);
        dispatch(LoadStates(states));
      }
      if (state) {
        const counties = await RequestChildren(state);
        dispatch(LoadCounties(counties));
      }
      if (county) {
        const cities = await RequestChildren(county);
        dispatch(LoadCities(cities));
      } */
    } catch (error) {
      dispatch(ErrorCountries(error));
    }
  };
}

// ------------------------------------
// States
// ------------------------------------
function FetchStates(): GeonamesAction {
  return { type: GeonamesTypes.FETCH_STATES };
}

function ErrorStates(payload: Error): GeonamesAction {
  return { type: GeonamesTypes.ERROR_STATES, payload };
}

function LoadStates(payload: any[]): GeonamesAction {
  return { type: GeonamesTypes.LOAD_STATES, payload };
}

async function RequestStates(
  country: GeonamesCountry
): Promise<GeonamesChildren[]> {
  const states = (await geonames.children({
    geonameId: country.geonameId,
  })) as GeonamesResult<GeonamesChildren>;
  return states.geonames;
}

export function GetStates(country: GeonamesCountry): Function {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(FetchStates());
      const states = await RequestStates(country);
      dispatch(LoadStates(states));
    } catch (error) {
      dispatch(ErrorStates(error));
    }
  };
}

// ------------------------------------
// Counties
// ------------------------------------
function FetchCounties(): GeonamesAction {
  return { type: GeonamesTypes.FETCH_COUNTIES };
}

function ErrorCounties(payload: Error): GeonamesAction {
  return { type: GeonamesTypes.ERROR_COUNTIES, payload };
}

function LoadCounties(payload: any[]): GeonamesAction {
  return { type: GeonamesTypes.LOAD_COUNTIES, payload };
}

export function GetCounties(state: GeonamesChildren): Function {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(FetchCounties());
      const counties = (await geonames.children({
        geonameId: state.geonameId,
      })) as GeonamesResult<GeonamesChildren>;

      dispatch(LoadCounties(counties.geonames));
    } catch (error) {
      dispatch(ErrorCounties(error));
    }
  };
}

// ------------------------------------
// Cities
// ------------------------------------
function FetchCities(): GeonamesAction {
  return { type: GeonamesTypes.FETCH_CITIES };
}

function ErrorCities(payload: Error): GeonamesAction {
  return { type: GeonamesTypes.ERROR_CITIES, payload };
}

function LoadCities(payload: any[]): GeonamesAction {
  return { type: GeonamesTypes.LOAD_CITIES, payload };
}

export function GetCities(county: GeonamesChildren): Function {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(FetchCities());
      const cities = (await geonames.children({
        geonameId: county.geonameId,
      })) as GeonamesResult<GeonamesChildren>;

      dispatch(LoadCities(cities.geonames));
    } catch (error) {
      dispatch(ErrorCities(error));
    }
  };
}