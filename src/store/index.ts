// ------------------------------------
// Imports
// ------------------------------------
import {combineReducers, createStore, applyMiddleware, Store} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import SystemReducers from "./system/systemReducers";
import AuthReducers from "./auth/authReducers";
import UserReducers from "./user/userReducers";
import GoalsReducers from "./goals/goalsReducers";

import AuthMiddleware from "./auth/authMiddleware";

import LocalStorage from "../constants/localStorage";

const RootReducer = combineReducers({
    system: SystemReducers,
    auth: AuthReducers,
    user: UserReducers,
    goals: GoalsReducers,
});

export type TAppState = ReturnType<typeof RootReducer>;

// export default function configureStore() {
function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        RootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    // save configured store into local storage
    store.subscribe(() => LocalStorage.saveStore(store.getState()));

    return store;
}

class AppStore {
    public static store: Store;
    private static middlewares = [
        // AuthMiddleware,
        thunkMiddleware
    ];

    private constructor() {}

    public static configure() {
        const middleWareEnhancer = applyMiddleware(...AppStore.middlewares);

        const store = createStore(
            RootReducer,
            composeWithDevTools(middleWareEnhancer)
        );

        // store.subscribe(() => LocalStorage.saveStore(store.getState()));

        return AppStore.store = store;
    }
}

// ------------------------------------
// Exports
// ------------------------------------
export default AppStore;

export * from './system/systemTypes';
export * from './auth/authTypes';
export * from './user/userTypes';
export * from './goals/goalsTypes';

export {default as SystemActions} from "./system/systemActions";
export {default as AuthActions} from "./auth/authActions";
export {default as UserActions} from "./user/userActions";
export {default as GoalsActions} from "./goals/goalsActions";
