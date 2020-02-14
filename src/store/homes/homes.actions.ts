import {Dispatch} from "redux";
import * as firebase from "firebase";

import Database, {IPagination} from "../../constants/firebase/database";
import {
    DELETE_HOMES,
    ERROR_HOME,
    ERROR_HOMES,
    FETCH_HOME,
    FETCH_HOMES,
    IHome,
    IHomeActions,
    IHomeStats,
    LOAD_HOME,
    LOAD_HOMES
} from "./homes.types";

// ------------------------------------
// Home config
// ------------------------------------
const database = new Database<IHome, IHomeStats>({
    path: 'homes',
    onStats
});

function onStats(action: string, docs: IHome | IHome[], batch: firebase.firestore.WriteBatch): void {

}

// ------------------------------------
// Home
// ------------------------------------
function FetchHome(): IHomeActions {
    return {type: FETCH_HOME};
}

function LoadHome(payload: IHome): IHomeActions {
    return {type: LOAD_HOME, payload};
}

function ErrorHome(payload: Error): IHomeActions {
    return {type: ERROR_HOME, payload};
}

export function AddHome(home: IHome): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchHome());
            home = await database.add(home);
            dispatch(LoadHome(home));
        } catch (error) {
            dispatch(ErrorHome(error))
        }
    }
}

export function GetHome(id: string): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchHome());
            const home = await database.get(id);
            dispatch(LoadHome(home));
        } catch (error) {
            dispatch(ErrorHome(error));
        }
    }
}

export function UpdateHome(home: IHome): IHomeActions {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchHome());
            home = await database.update(home);
            dispatch(LoadHome(home));
        } catch (error) {
            dispatch(ErrorHome(error));
        }
    }
}

// ------------------------------------
// Homes
// ------------------------------------

function FetchHomes(): IHomeActions{
    return {type: FETCH_HOMES};
}

function LoadHomes(payload: IHome[]): IHomeActions {
    return {type: LOAD_HOMES, payload};
}

function ErrorHomes(payload: Error): IHomeActions {
    return {type: ERROR_HOMES, payload};
}

function _DeleteDogs(payload: IHome[]): IHomeActions {
    return {type: DELETE_HOMES, payload};
}

export function GetDogs(pagination?: IPagination): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchHomes());
            const homes = await database.all(pagination);
            dispatch(LoadHomes(homes));
        } catch (error) {
            dispatch(ErrorHomes(error))
        }
    }
}

export function DeleteDogs(homes: IHome[]): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchHomes);
            await database.delete(homes);
            dispatch(_DeleteDogs(homes));
        } catch (error) {
            dispatch(ErrorHomes(error));
        }
    }
}
