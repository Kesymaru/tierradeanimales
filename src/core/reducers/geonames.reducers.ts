import {
  Status,
  GeonamesState,
  GeonamesAction,
  GeonamesTypes,
} from "../models";
import { FlagCountries, InitGeonamesState } from "../constants";

export function GeonamesReducers(
  state: GeonamesState = InitGeonamesState,
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
          ...InitGeonamesState.countries,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_COUNTRIES:
      return {
        ...state,
        countries: {
          ...InitGeonamesState.countries,
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
          ...InitGeonamesState.states,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_STATES:
      return {
        ...state,
        states: {
          ...InitGeonamesState.states,
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
          ...InitGeonamesState.counties,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_COUNTIES:
      return {
        ...state,
        counties: {
          ...InitGeonamesState.counties,
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
          ...InitGeonamesState.cities,
          status: Status.Fetching,
        },
      };
    case GeonamesTypes.ERROR_CITIES:
      return {
        ...state,
        cities: {
          ...InitGeonamesState.cities,
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
