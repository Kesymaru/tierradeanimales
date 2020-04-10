import {
  Status,
  GeonamesState,
  GeonamesAction,
  GeonamesTypes,
} from "../models";

import { FlagCountries, INIT_GEONAMES_STATE } from "../constants";

export function GeonamesReducers(
  state: GeonamesState = INIT_GEONAMES_STATE,
  action: GeonamesAction
): GeonamesState {
  switch (action.type) {
    // ------------------------------------
    // Countries
    // ------------------------------------
    case GeonamesTypes.FETCH_COUNTRIES:
      return {
        ...state,
        countries: {
          ...INIT_GEONAMES_STATE.countries,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_COUNTRIES:
      return {
        ...state,
        countries: {
          ...INIT_GEONAMES_STATE.countries,
          status: Status.Error,
          error: action.payload,
        },
      };
    case GeonamesTypes.LOAD_COUNTRIES:
      return {
        ...state,
        countries: {
          status: Status.Loaded,
          data: action.payload.map((country) => {
            const flag = FlagCountries.find(
              (f) => f.name === country.countryName
            );
            return { ...country, icon: flag ? flag.icon : undefined };
          }),
        },
      };

    // ------------------------------------
    // States
    // ------------------------------------
    case GeonamesTypes.FETCH_STATES:
      return {
        ...state,
        states: {
          ...INIT_GEONAMES_STATE.states,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_STATES:
      return {
        ...state,
        states: {
          ...INIT_GEONAMES_STATE.states,
          status: Status.Error,
          error: action.payload,
        },
      };
    case GeonamesTypes.LOAD_STATES:
      return {
        ...state,
        states: {
          status: Status.Loaded,
          data: action.payload,
        },
      };

    // ------------------------------------
    // Counties
    // ------------------------------------
    case GeonamesTypes.FETCH_COUNTIES:
      return {
        ...state,
        counties: {
          ...INIT_GEONAMES_STATE.counties,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_COUNTIES:
      return {
        ...state,
        counties: {
          ...INIT_GEONAMES_STATE.counties,
          status: Status.Error,
          error: action.payload,
        },
      };
    case GeonamesTypes.LOAD_COUNTIES:
      return {
        ...state,
        counties: {
          status: Status.Loaded,
          data: action.payload,
        },
      };

    // ------------------------------------
    // Cities
    // ------------------------------------
    case GeonamesTypes.FETCH_CITIES:
      return {
        ...state,
        cities: {
          ...INIT_GEONAMES_STATE.cities,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_CITIES:
      return {
        ...state,
        cities: {
          ...INIT_GEONAMES_STATE.cities,
          status: Status.Error,
          error: action.payload,
        },
      };
    case GeonamesTypes.LOAD_CITIES:
      return {
        ...state,
        cities: {
          status: Status.Loaded,
          data: action.payload,
        },
      };

    default:
      return state;
  }
}

export default GeonamesReducers;
