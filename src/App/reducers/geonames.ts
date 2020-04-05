import {
  Status,
  GeonamesState,
  GeonamesAction,
  GeonamesTypes,
} from "../models";

import FlagCountries from "../constants/countries";

const InitState: GeonamesState = {
  countries: {
    status: Status.Empty,
    data: [],
  },
  states: {
    status: Status.Empty,
    data: [],
  },
  counties: {
    status: Status.Empty,
    data: [],
  },
  cities: {
    status: Status.Empty,
    data: [],
  },
};

export function GeonamesReducers(
  state: GeonamesState = InitState,
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
          ...InitState.countries,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_COUNTRIES:
      return {
        ...state,
        countries: {
          ...InitState.countries,
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
          ...InitState.states,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_STATES:
      return {
        ...state,
        states: {
          ...InitState.states,
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
          ...InitState.counties,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_COUNTIES:
      return {
        ...state,
        counties: {
          ...InitState.counties,
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
          ...InitState.cities,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_CITIES:
      return {
        ...state,
        cities: {
          ...InitState.cities,
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
