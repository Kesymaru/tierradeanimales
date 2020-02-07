import {RouterState} from "connected-react-router";

import {ISystemState} from "./system/system.types";
import {IAuthState} from "./auth/auth.types";
import {IUserState} from "./user/user.types";
import {IDogState} from "./dogs/dogs.types";

export interface IAppState {
    system: ISystemState;
    auth: IAuthState;
    user: IUserState;
    dogs: IDogState;
    router: RouterState;
}

export interface IAppStateItem<T> {
    status: TStatus;
    data: T;
    id?: string|null;
    error?: string | Error;
}

export enum TStatus {
    Empty,
    Loaded,
    Fetching,
    Error
}

interface IDataOptions {
    _selected?: boolean;
}

export interface IData extends IDataOptions {
    id: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export const IDataDefaults: IDataOptions = {
    _selected: false,
};
