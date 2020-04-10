import GeonamesState from "../models/geonames";

export const INIT_GEONAMES_STATE: GeonamesState = {
  countries: {
    data: [],
    isLoaded: false,
    isEmpty: true,
  },
  states: {
    data: [],
    isLoaded: false,
    isEmpty: true,
  },
  counties: {
    data: [],
    isLoaded: false,
    isEmpty: true,
  },
  cities: {
    data: [],
    isLoaded: false,
    isEmpty: true,
  },
};

export default INIT_GEONAMES_STATE;
