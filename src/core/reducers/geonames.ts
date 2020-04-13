import { GeonamesState, GeonamesAction, GeonamesTypes } from "../models";

import { FLAG_CPUNTRIES, INIT_GEONAMES_STATE } from "../constants";

export function GeonamesReducers(
  state: GeonamesState = INIT_GEONAMES_STATE,
  action: GeonamesAction
): GeonamesState {
  switch (action.type) {
    // ------------------------------------
    // Countries
    // ------------------------------------
    case GeonamesTypes.FETCH_COUNTRIES:
    case GeonamesTypes.ERROR_COUNTRIES: {
      console.log("fetch and error countries", action);
      return {
        ...state,
        countries: {
          ...INIT_GEONAMES_STATE.countries,
          loading: true,
        },
      };
    }

    case GeonamesTypes.LOAD_COUNTRIES: {
      console.log("load countries", action);
      return {
        ...state,
        countries: {
          data: action.payload.map((country) => {
            const flag = FLAG_CPUNTRIES.find(
              (f) => f.name === country.countryName
            );
            return { ...country, icon: flag ? flag.icon : undefined };
          }),
          loading: false,
          loaded: true,
        },
      };
    }

    // ------------------------------------
    // States
    // ------------------------------------
    case GeonamesTypes.FETCH_STATES:
    case GeonamesTypes.ERROR_STATES:
      return {
        ...state,
        states: {
          ...INIT_GEONAMES_STATE.states,
          loading: true,
        },
      };

    case GeonamesTypes.LOAD_STATES:
      return {
        ...state,
        states: {
          data: action.payload,
          loading: false,
          loaded: true,
        },
      };

    // ------------------------------------
    // Counties
    // ------------------------------------
    case GeonamesTypes.FETCH_COUNTIES:
    case GeonamesTypes.ERROR_COUNTIES:
      return {
        ...state,
        counties: {
          ...INIT_GEONAMES_STATE.counties,
          loading: true,
        },
      };

    case GeonamesTypes.LOAD_COUNTIES:
      return {
        ...state,
        counties: {
          data: action.payload,
          loading: false,
          loaded: true,
        },
      };

    // ------------------------------------
    // Cities
    // ------------------------------------
    case GeonamesTypes.FETCH_CITIES:
    case GeonamesTypes.ERROR_CITIES:
      return {
        ...state,
        cities: {
          ...INIT_GEONAMES_STATE.cities,
          loading: true,
        },
      };

    case GeonamesTypes.LOAD_CITIES:
      return {
        ...state,
        cities: {
          data: action.payload,
          loading: false,
          loaded: true,
        },
      };

    default:
      return state;
  }
}

export default GeonamesReducers;
