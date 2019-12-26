import {combineReducers, createStore} from "redux";

import {goalsReducers} from "./goals/reducers";

export type TAppState = ReturnType<typeof goalsReducers>;

export default function configureStore() {
    const store = createStore(goalsReducers);
    return store;
}

// types
export * from './goals/types';

// actions
export * from './goals/actions'
