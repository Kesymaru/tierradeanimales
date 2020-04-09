import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from "@/core/store/node_modules/redux";
import firebase from "@/core/store/node_modules/firebase/app";
import "@/core/store/node_modules/firebase/auth";
import "@/core/store/node_modules/firebase/firestore";
import thunkMiddleware from "@/core/store/node_modules/redux-thunk";
import { composeWithDevTools } from "@/core/store/node_modules/redux-devtools-extension";
import { connectRouter, routerMiddleware } from "connected-react-router";
import {
  createBrowserHistory,
  History,
} from "@/core/store/node_modules/history";

import {
  firebaseReducer,
  ReactReduxFirebaseProviderProps,
  ReactReduxFirebaseConfig,
} from "@/core/store/node_modules/react-redux-firebase";
import {
  firestoreReducer,
  createFirestoreInstance,
} from "@/core/store/node_modules/redux-firestore";

import { AppState, DBSchema } from "../models";
import { FirebaseConfig } from "../config";
import GeonamesReducers from "../reducers/geonames";

// Store
export const AppHistory: History = createBrowserHistory();
export const AppStore: Store = configureStore();

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
