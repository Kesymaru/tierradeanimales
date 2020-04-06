import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from "redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";

import {
  firebaseReducer,
  ReactReduxFirebaseProviderProps,
  ReactReduxFirebaseConfig,
} from "react-redux-firebase";
import { firestoreReducer, createFirestoreInstance } from "redux-firestore";

import { AppState, DBSchema } from "@/App/models";
import { FirebaseConfig } from "@/config/constants";
import GeonamesReducers from "../reducers/geonames";

// Store
export const AppStore: Store = configureStore();
export const AppHistory: History = createBrowserHistory();

// React Redux Firebase
export const RrfConfig: Partial<ReactReduxFirebaseConfig> = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableClaims: true,
};
export const RrfProps: ReactReduxFirebaseProviderProps = {
  firebase,
  config: RrfConfig,
  dispatch: AppStore.dispatch,
  createFirestoreInstance,
};

interface UserProfile {
  email: string;
}

export function configureStore(): Store {
  initFirebaseServices();

  const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    firebase: firebaseReducer,
    firestore: firestoreReducer as Reducer<DBSchema>,
    router: connectRouter(AppHistory),
    geonames: GeonamesReducers,
  });

  const middleWareEnhancer = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(AppHistory)
  );

  const store: Store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}

function initFirebaseServices() {
  firebase.initializeApp(FirebaseConfig);
  firebase.firestore();
}
