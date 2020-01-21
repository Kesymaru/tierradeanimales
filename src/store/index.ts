// ------------------------------------
// Imports
// ------------------------------------
import {combineReducers, createStore, applyMiddleware, Store} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import SystemReducers from "./system/system.reducers";
import AuthReducers from "./auth/auth.reducers";
import UserReducers from "./user/user.reducers";
import GoalsReducers from "./goals/goalsReducers";

const RootReducer = combineReducers({
    system: SystemReducers,
    auth: AuthReducers,
    user: UserReducers,
    goals: GoalsReducers,
});

export type TAppState = ReturnType<typeof RootReducer>;

// export default function configureStore() {
/*function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        RootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    // save configured store into local storage
    store.subscribe(() => LocalStorage.saveStore(store.getState()));

    return store;
}*/

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

export * from './system/system.types';
export * from './auth/auth.types';
export * from './user/user.types';
export * from './goals/goalsTypes';

export {default as SystemActions} from "./system/system.actions";
export {default as AuthActions} from "./auth/auth.actions";
export {default as UserActions} from "./user/user.actions";
export {default as GoalsActions} from "./goals/goalsActions";
