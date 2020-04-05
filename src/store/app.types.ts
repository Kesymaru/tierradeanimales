import { RouterState } from "connected-react-router";

import IGeonamesState from "./geonames/geonames.types";

export default interface IAppState {
  geonames: IGeonamesState;
  router: RouterState;
}
