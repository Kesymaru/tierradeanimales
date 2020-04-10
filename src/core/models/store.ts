import { combineReducers, Reducer } from "redux";
import { RouterState } from "connected-react-router";
import { FirebaseReducer } from "react-redux-firebase";

import GeonamesState from "@core/models/geonames";
import User from "@app/user/models/user";
import NewsletterState from "@app/home/models";

export interface AppState {
  firebase: FirebaseReducer.Reducer<User, {}>;
  // firestore: DBSchema;
  firestore: DBSchema;
  router: RouterState;
  geonames: GeonamesState;
}

export interface State<T> {
  data: T | Array<T> | null;
  isLoaded: boolean;
  isEmpty: boolean;
}

// create schema for the DB
export interface DBSchema extends NewsletterState {}
// export type AppState = ReturnType<typeof rootReducer>;

export default AppState;
