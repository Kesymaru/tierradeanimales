import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from "connected-react-router";
import { createBrowserHistory, History } from "history";

import {
  firebaseReducer,
  ReactReduxFirebaseProviderProps,
  ReactReduxFirebaseConfig,
} from "react-redux-firebase";
import { firestoreReducer, createFirestoreInstance } from "redux-firestore";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import FirebaseConfig from "./firebase.config";
import GeonamesReducers from "./geonames/geonames.reducers";
import IGeonamesState from "./geonames/geonames.types";

// Store
export const AppStore: Store = configure();
export const AppHistory: History = createBrowserHistory();

// React Redux Firebase
const RrfConfig: ReactReduxFirebaseConfig = {
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

/**
 * Configure redux store with firebase database, auth and firestore
 */
function configure(): Store {
  initFirebaseServices();

  const rootReducer: Reducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
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
