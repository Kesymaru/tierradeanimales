import {applyMiddleware, combineReducers, createStore, Reducer, Store, StoreEnhancer} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory, History} from 'history'

import SystemReducers from "./system/system.reducers";
import AuthReducers from "./auth/auth.reducers";
import UserReducers from "./user/user.reducers";
import DogsReducers from "./dogs/dogs.reducers";
import HomesReducers from "./homes/homes.reducers";

class AppStore {
    public static store: Store;
    public static history: History;

    private static rootReducer: Reducer;
    private static reducers = {
        system: SystemReducers,
        auth: AuthReducers,
        user: UserReducers,
        dogs: DogsReducers,
        homes: HomesReducers,
    };
    private static middlewares = [
        // AuthMiddleware,
        thunkMiddleware
    ];

    public static Configure(): Store {
        AppStore.history = createBrowserHistory();
        AppStore.rootReducer = AppStore.CreateRootReducer();

        // const middleWareEnhancer = applyMiddleware(...AppStore.middlewares);
        const middleWareEnhancer = AppStore.ApplyMiddleware();

        AppStore.store = createStore(
            AppStore.rootReducer,
            composeWithDevTools(middleWareEnhancer)
        );

        return AppStore.store;
    }

    private static CreateRootReducer(): Reducer {
        return combineReducers({
            ...AppStore.reducers,
            router: connectRouter(AppStore.history),
        });
    }

    private static ApplyMiddleware(): StoreEnhancer {
        return applyMiddleware(
            ...AppStore.middlewares,
            routerMiddleware(AppStore.history),
        );
    }
}

export default AppStore;
