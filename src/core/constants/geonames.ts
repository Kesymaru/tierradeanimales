import GeonamesState from "../models/geonames";

export const INIT_GEONAMES_STATE: GeonamesState = {
  countries: {
    data: [],
    loading: false,
    loaded: false,
  },
  states: {
    data: [],
    loading: false,
    loaded: false,
  },
  counties: {
    data: [],
    loading: false,
    loaded: false,
  },
  cities: {
    data: [],
    loading: false,
    loaded: false,
  },
};

export default INIT_GEONAMES_STATE;
