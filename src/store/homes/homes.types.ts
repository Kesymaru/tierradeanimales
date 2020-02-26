import * as firebase from "firebase";
import Joi, {AnySchema} from "@hapi/joi";

import {IAppStateItem, IAppStateItems} from "../app.types";
import {
    IAddress,
    IAddressFactory,
    IAddressValidator,
    IData,
    IDataFactory,
    IResult,
    IStats, Validator
} from "../../constants/firebase/database";
import {IDog} from "../dogs/dogs.types";

// ------------------------------------
// IHomeContact
// ------------------------------------
export interface IHomeContact extends IData {
    name: string;
    phone: number | string;
    email: string;
}

export function IHomeContactFactory(
    values?: Partial<IHomeContact>,
    _new: boolean = true): IHomeContact {
    return {
        name: '',
        phone: '',
        email: '',

        ...IDataFactory({_new}),
        ...values,
    }
}

export function IHomeContactValidator(value: IHomeContact | IHomeContact[] | boolean) {
    const schema = Joi.object({
        name: Joi.string().min(3).label('Contact Name'),
        phone: Joi.string().alphanum().min(8).label('Contact Phone'),
        email: Joi.string().email({tlds: {allow: false}}).label('Contact Email'),
    });

    if (Array.isArray(value))
        return Validator(Joi.array()
            .items(schema)
            .has(schema)
            .message("Must Include at least one contact."), value);
    return Validator(schema, value);
}

// ------------------------------------
// IHome
// ------------------------------------
export interface IHome extends IData {
    name: string;
    active: boolean;
    address: IAddress;

    contacts?: IHomeContact[];
    dogs?: IDog[];
}

export function IHomeFactory(value?: Partial<IHome>, _new: boolean = true): IHome {
    return {
        name: '',
        active: true,
        address: IAddressFactory(),
        contacts: [IHomeContactFactory()],
        ...IDataFactory({_new}),
        ...value,
    }
}

export function IHomeValidator(value: IHome | boolean) {
    const addressSchema = IAddressValidator(true) as AnySchema;
    return Validator(Joi.object({
        name: Joi.string().min(3).required().label('Name'),
        active: Joi.boolean().optional(),
        address: addressSchema.label('Address'),
        contacts: Joi.array().has(IHomeContactValidator(true)).label('Contacts'),
    }), value);
}

// ------------------------------------
// IHomeState
// ------------------------------------
export default interface IHomeState {
    homes: IAppStateItems<IHome>;
    home: IAppStateItem<IHome>;
}

export interface IHomeStats extends IStats {
    active: number | firebase.firestore.FieldValue;
    inactive: number | firebase.firestore.FieldValue;
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
// Foster HomePage
// ------------------------------------
export const FETCH_HOME = 'FETCH_HOME';

interface IFetchHome {
    type: typeof FETCH_HOME;
}

export const ERROR_HOME = 'ERROR_HOME';

interface IErrorHome {
    type: typeof ERROR_HOME;
    payload: Error | string;
}

export const LOAD_HOME = 'LOAD_HOME';

interface ILoadHome {
    type: typeof LOAD_HOME;
    payload: IHome;
}

// ------------------------------------
// Foster Homes
// ------------------------------------
export const FETCH_HOMES = 'FETCH_HOMES';

interface IFetchHomes {
    type: typeof FETCH_HOMES;
}

export const ERROR_HOMES = 'ERROR_HOMES';

interface IErrorHomes {
    type: typeof ERROR_HOMES;
    payload: Error | string;
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

// ------------------------------------
// HomePage Actions
// ------------------------------------
export type IHomeActions =
    IFetchHome |
    IErrorHome |
    ILoadHome |

    IFetchHomes |
    IErrorHomes |
    ILoadHomes |
    IDeleteHomes
    ;
