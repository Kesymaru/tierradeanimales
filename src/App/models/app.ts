import { combineReducers, Reducer } from "redux";
import { RouterState } from "connected-react-router";
import { FirebaseReducer } from "react-redux-firebase";

import User from "@/User/models";
import GeonamesState from "@/App/models/geonames";

export interface AppState {
  firebase: FirebaseReducer.Reducer<User, {}>;
  firestore: DBSchema;
  router: RouterState;
  geonames: GeonamesState;
}

export interface StateItem<T> {
  status: Status;
  data: T | Array<T> | null;
  id?: string | number | null;
  error?: string | Error;
}

export enum Status {
  Empty,
  Loaded,
  Fetching,
  Error,
}

// create schema for the DB
export interface DBSchema {}

// export type AppState = ReturnType<typeof rootReducer>;

export default AppState;
