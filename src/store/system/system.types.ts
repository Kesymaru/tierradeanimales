import {Validator} from "../../constants/firebase/database";
import Joi, {AnySchema} from "@hapi/joi";

// ------------------------------------
// Interfaces
// ------------------------------------
export interface INotification {
    message: string;
    open: boolean;
    type?: string;
    duration?: number;
}

export interface IContact {
    name: string;
    email: string;
    message: string;
}

export function IContactFactory(values?: Partial<IContact>): IContact {
    return {name: '', email: '', message: '', ...values}
}

export function IContactSchema(labels?: Partial<IContact>): AnySchema {
    return Joi.object({
        name: Joi.string()
            .min(3)
            .required()
            .label(labels?.name || 'Name'),
        email: Joi.string()
            .email({tlds: {allow: false}})
            .required()
            .label(labels?.email || "Email"),
        message: Joi.string()
            .min(3)
            .required()
            .label(labels?.message || 'Message'),
    });
}

export interface ISystemLoading {
    [key: string]: boolean;
}

export default interface ISystemState {
    notifications: INotification[];
    loading: boolean;
    loadingStatus: ISystemLoading;
    errors?: Error[];
}

// ------------------------------------
// Loading
// ------------------------------------
export const LOADING = 'LOADING';

interface ILoading {
    type: typeof LOADING;
    payload: ISystemLoading;
}

// -------------------------
// Errors
export const ERROR = 'ERROR';

interface IError {
    type: typeof ERROR;
    status?: string | number;
    payload: Error;
}


export const NOTIFY = 'NOTIFY';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

interface INotify {
    type: typeof NOTIFY,
    payload: INotification,
}

interface ICloseNotification {
    type: typeof CLOSE_NOTIFICATION;
    payload: INotification;
}

export type TSystemActions =
    ILoading |

    IError |

    INotify |
    ICloseNotification
    ;
