import { Status, GeonamesState } from "../models";

export const INIT_GEONAMES_STATE: GeonamesState = {
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

export default INIT_GEONAMES_STATE;
