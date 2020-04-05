import { RouterState } from "connected-react-router";

import { GeonamesState } from "./geonames";

export default interface State {
  geonames: GeonamesState;
  router: RouterState;
}

export interface StateItem<T> {
  status: Status;
  data: T | null;
  id: string | number | null;
  error?: string | Error;
}

export enum Status {
  Empty,
  Loaded,
  Fetching,
  Error,
}
