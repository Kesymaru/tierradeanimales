import {Dispatch} from "redux";

import Database, {IPagination, IResult} from "../../constants/firebase/database";
import {
    DELETE_HOMES,
    ERROR_HOME,
    ERROR_HOMES,
    FETCH_HOME,
    FETCH_HOMES,
    IHome,
    IHomeActions,
    IHomeStats,
    IHomeStatsFactory,
    LOAD_HOME,
    LOAD_HOMES
} from "./homes.types";
import Storage from "../../constants/firebase/storage";

// ------------------------------------
// Dashboard config
// ------------------------------------
const storage = new Storage({path: 'homes'});
const database = new Database<IHome, IHomeStats>({
    path: 'homes',
    statsFactory: IHomeStatsFactory,
    countStats
});

function countStats(multiple: number, stats: IHomeStats, home: IHome): IHomeStats {
    if(multiple === 0 && home._prev && home.active !== home._prev.active) {
        stats = countStats(1, stats, home);
        stats = countStats(-1, stats, home._prev as IHome);
        return stats;
    }

    stats.total = +stats.total + multiple;
    if(home.active) stats.active = +stats.active + multiple;
    else stats.inactive = +stats.inactive + multiple;

    return stats;
}

// ------------------------------------
// Dashboard
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
            home = await database.add(home) as IHome;
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
            const home = await database.get(id) as IHome;
            dispatch(LoadHome(home));
        } catch (error) {
            dispatch(ErrorHome(error));
        }
    }
}

export function UpdateHome(home: IHome): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(FetchHome());
            home = await database.update(home) as IHome;
            dispatch(LoadHome(home));
        } catch (error) {
            dispatch(ErrorHome(error));
        }
    }
}

// ------------------------------------
// Homes
// ------------------------------------
function FetchHomes(): IHomeActions {
    return {type: FETCH_HOMES};
}

function LoadHomes(payload: IResult<IHome>): IHomeActions {
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
            dispatch(FetchHomes());
            await database.delete(homes);
            dispatch(_DeleteDogs(homes));
        } catch (error) {
            dispatch(ErrorHomes(error));
        }
    }
}
