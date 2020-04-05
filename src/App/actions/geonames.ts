import { Dispatch } from "redux";

import { ActionType, Action } from "@/App/models/geonames";

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
function FetchCountries(): Action {
  return { type: ActionType.FETCH_COUNTRIES };
}

function ErrorCountries(payload: Error): Action {
  return { type: ActionType.ERROR_COUNTRIES, payload };
}

function LoadCountries(payload: IGeonamesCountry[]): Action {
  return { type: ActionType.LOAD_COUNTRIES, payload };
}

async function RequestCountries(): Promise<IGeonamesCountry[]> {
  const results = (await geonames.countryInfo()) as IGeonamesResult<
    IGeonamesCountry
  >;
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
  };
}

// ------------------------------------
// States
// ------------------------------------
function FetchStates(): Action {
  return { type: ActionType.FETCH_STATES };
}

function ErrorStates(payload: Error): Action {
  return { type: ActionType.ERROR_STATES, payload };
}

function LoadStates(payload: any[]): Action {
  return { type: ActionType.LOAD_STATES, payload };
}

async function RequestStates(
  country: GeonamesCountry
): Promise<GeonamesChildren[]> {
  const states = (await geonames.children({
    geonameId: country.geonameId,
  })) as GeonamesResult<IGeonamesChildren>;
  return states.geonames;
}

export function GetStates(country: any): Function {
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
function FetchCounties(): Action {
  return { type: ActionType.FETCH_COUNTIES };
}

function ErrorCounties(payload: Error): Action {
  return { type: ActionType.ERROR_COUNTIES, payload };
}

function LoadCounties(payload: any[]): Action {
  return { type: ActionType.LOAD_COUNTIES, payload };
}

export function GetCounties(state: any): Function {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(FetchCounties());
      const counties = (await geonames.children({
        geonameId: state.geonameId,
      })) as GeonamesResult<IGeonamesChildren>;
      dispatch(LoadCounties(counties.geonames));
    } catch (error) {
      dispatch(ErrorCounties(error));
    }
  };
}

// ------------------------------------
// Cities
// ------------------------------------
function FetchCities(): Action {
  return { type: FETCH_CITIES };
}

function ErrorCities(payload: Error): Action {
  return { type: ERROR_CITIES, payload };
}

function LoadCities(payload: any[]): Action {
  return { type: LOAD_CITIES, payload };
}

export function GetCities(county: any): Function {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(FetchCities());
      const cities = (await geonames.children({
        geonameId: county.geonameId,
      })) as IGeonamesResult<IGeonamesChildren>;
      dispatch(LoadCities(cities.geonames));
    } catch (error) {
      dispatch(ErrorCities(error));
    }
  };
}
