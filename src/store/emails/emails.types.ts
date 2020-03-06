import Joi, {AnySchema} from "@hapi/joi";
import * as firebase from "firebase";

import {IData, IDataFactory, IStats} from "../../constants/firebase/database";
import {IAppStateItem, IAppStateItems} from "../app.types";

// ------------------------------------
// IEmail
// ------------------------------------
export interface IEmail extends IData {
    to: string;
    message: {
        subject: string;
        html: string;
    }
}

export function IEmailFactory(value?: Partial<IEmail>): IEmail {
    return {
        to: '',
        message: {subject: '',html: ''},
        ...IDataFactory(),
        ...value
    }
}

// ------------------------------------
// Emails Stats
// ------------------------------------
export interface IEmailsStats extends IStats {
    contact: number | firebase.firestore.FieldValue;
}

export function IEmailsStatsFactory(config: Partial<IEmailsStats>): IEmailsStats {
    return {
        ...config,
        total: config.total ? config.total : 0,
        contact: config.contact ? config.contact : 0,
    }
}

// ------------------------------------
// IContact
// ------------------------------------
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

// ------------------------------------
// Email
// ------------------------------------
export const FETCH_EMAIL = 'FETCH_EMAIL';
interface IFetchEmail {
    type: typeof FETCH_EMAIL;
}

export const LOAD_EMAIL = 'LOAD_EMAIL';
interface ILoadEmail {
    type: typeof LOAD_EMAIL;
    payload: IEmail;
}

export const ERROR_EMAIL = 'ERROR_EMAIL';

interface IErrorEmail {
    type: typeof ERROR_EMAIL;
    payload: Error;
}

// ------------------------------------
// Emails State
// ------------------------------------
export default interface IEmailState extends IAppStateItem<IEmail> {
}

// ------------------------------------
// Emails Actions
// ------------------------------------
export type IEmailsActions =
    IFetchEmail |
    ILoadEmail |
    IErrorEmail
    ;
