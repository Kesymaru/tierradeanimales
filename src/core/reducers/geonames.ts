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
    case GeonamesTypes.ERROR_COUNTRIES:
      return {
        ...state,
        countries: {
          ...INIT_GEONAMES_STATE.countries,
        },
      };

    case GeonamesTypes.LOAD_COUNTRIES:
      return {
        ...state,
        countries: {
          data: action.payload.map((country) => {
            const flag = FLAG_CPUNTRIES.find(
              (f) => f.name === country.countryName
            );
            return { ...country, icon: flag ? flag.icon : undefined };
          }),
          isLoaded: true,
          isEmpty: false,
        },
      };

    // ------------------------------------
    // States
    // ------------------------------------
    case GeonamesTypes.FETCH_STATES:
    case GeonamesTypes.ERROR_STATES:
      return {
        ...state,
        states: {
          ...INIT_GEONAMES_STATE.states,
        },
      };

    case GeonamesTypes.LOAD_STATES:
      return {
        ...state,
        states: {
          data: action.payload,
          isLoaded: true,
          isEmpty: false,
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
          isLoaded: false,
          isEmpty: true,
        },
      };

    case GeonamesTypes.LOAD_COUNTIES:
      return {
        ...state,
        counties: {
          data: action.payload,
          isLoaded: false,
          isEmpty: true,
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
        },
      };

    case GeonamesTypes.LOAD_CITIES:
      return {
        ...state,
        cities: {
          data: action.payload,
          isLoaded: true,
          isEmpty: false,
        },
      };

    default:
      return state;
  }
}

export default GeonamesReducers;
