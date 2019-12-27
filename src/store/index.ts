import {combineReducers, createStore} from "redux";

import {GoalsReducers} from "./goals/reducers";
import {SystemReducers} from "./system/reducers";

const RootReducer = combineReducers({
    system: SystemReducers,
    goals: GoalsReducers
});

export type TAppState = ReturnType<typeof RootReducer>;

export default function configureStore() {
    const store = createStore(RootReducer);
    return store;
}

// types
export * from './system/types'
export * from './goals/types';

// actions
export * from './system/actions'
export * from './goals/actions'
