import {RouterState} from "connected-react-router";

import ISystemState from "./system/system.types";
import IAuthState from "./auth/auth.types";
import IUserState from "./user/user.types";
import IDogState from "./dogs/dogs.types";
import {IResult} from "../constants/firebase/database";
import IHomeState from "./homes/homes.types";
import IGeonamesState from "./geonames/geonames.types";

export default interface IAppState {
    system: ISystemState;
    auth: IAuthState;
    user: IUserState;
    dogs: IDogState;
    homes: IHomeState;
    geonames: IGeonamesState;
    router: RouterState;
}

export interface IAppStateItem<T> {
    status: TStatus;
    data: T | null;
    id: string | number | null;
    error?: string | Error;
}

export interface IAppStateItems<T> extends IResult<T> {
    status: TStatus;
    error?: string | Error
}

export enum TStatus {
    Empty,
    Loaded,
    Fetching,
    Error
}
