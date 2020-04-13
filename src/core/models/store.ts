// import { combineReducers, Reducer } from "redux";
import { RouterState } from "connected-react-router";
import { FirebaseReducer } from "react-redux-firebase";

import GeonamesState from "@core/models/geonames";
import User from "@app/user/models/user";
import { RouteState } from "../models/route";
import FirestoreSchema from "./firestore";
import AlertState from "./alert";

export interface AppState {
  firebase: FirebaseReducer.Reducer<User, {}>;
  firestore: FirestoreSchema;
  router: RouterState;
  route: RouteState;
  geonames: GeonamesState;
  alert: AlertState;
}

export interface State<T> {
  data: T | null;
  loading: boolean;
  loaded: boolean;
}

// export interface DBSchema extends NewsletterState {}
// export type AppState = ReturnType<typeof rootReducer>;

export default AppState;
