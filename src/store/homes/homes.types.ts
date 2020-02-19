import * as firebase from "firebase";

import {IAppStateItem, IAppStateItems} from "../app.types";
import {IData, IDataFactory, IResult, IStats} from "../../constants/firebase/database";
import {IDog} from "../dogs/dogs.types";

export interface IHomeStats extends IStats {
    active: number | firebase.firestore.FieldValue;
    inactive: number | firebase.firestore.FieldValue;
}

export interface IHomeContact extends IData {
    name: string;
    phone: number | string;
    email: string;
}

export function IHomeContactFactory(values?: Partial<IHomeContact>): IHomeContact {
    return {
        name: '',
        phone: '',
        email: '',
        _new: true,
        _selected: false,
        _deleted: false,

        ...IDataFactory(),
        ...values,
    }
}

export interface IHome extends IData {
    name: string;
    active: boolean;
    country: string;
    state: string;
    county: string;
    city: string;
    address: string;

    contacts?: IHomeContact[];
    dogs?: IDog[];
}

export function IHomeFactory(values?: Partial<IHome>): IHome {
    return {
        name: '',
        active: true,
        country: '',
        state: '',
        county: '',
        city: '',
        address: '',
        contacts: [IHomeContactFactory()],

        ...IDataFactory(),
        ...values,
    }
}

export default interface IHomeState {
    homes: IAppStateItems<IHome>;
    home: IAppStateItem<IHome>;
}

export function IHomeStatsFactory(config: Partial<IHomeStats>): IHomeStats {
    return {
        ...config,
        total: config.total ? config.total : 0,
        active: config.active ? config.active : 0,
        inactive: config.inactive ? config.inactive : 0,
    }
}

// ------------------------------------
// Foster Dashboard
// ------------------------------------
export const FETCH_HOME = 'FETCH_HOME';

interface IFetchHome {
    type: typeof FETCH_HOME;
}

export const LOAD_HOME = 'LOAD_HOME';

interface ILoadHome {
    type: typeof LOAD_HOME;
    payload: IHome;
}

export const ERROR_HOME = 'ERROR_HOME';

interface IErrorHome {
    type: typeof ERROR_HOME;
    payload: Error | string;
}

// ------------------------------------
// Foster Homes
// ------------------------------------
export const FETCH_HOMES = 'FETCH_HOMES';

interface IFetchHomes {
    type: typeof FETCH_HOMES;
}

export const LOAD_HOMES = 'LOAD_HOMES';

interface ILoadHomes {
    type: typeof LOAD_HOMES
    payload: IResult<IHome>;
}

export const DELETE_HOMES = 'DELETE_HOMES';

interface IDeleteHomes {
    type: typeof DELETE_HOMES;
    payload: IHome[];
}

export const ERROR_HOMES = 'ERROR_HOMES';

interface IErrorHomes {
    type: typeof ERROR_HOMES;
    payload: Error | string;
}

// ------------------------------------
// Dashboard Actions
// ------------------------------------
export type IHomeActions =
    IFetchHome |
    ILoadHome |
    IErrorHome |

    IFetchHomes |
    ILoadHomes |
    IDeleteHomes |
    IErrorHomes;