import { Status, GeonamesState } from "@core/models";

export const InitGeonamesState: GeonamesState = {
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

export default InitGeonamesState;
