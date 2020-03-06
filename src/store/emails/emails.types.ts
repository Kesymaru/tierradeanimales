import Joi, {AnySchema} from "@hapi/joi";
import {IData, IStats} from "../../constants/firebase/database";
import * as firebase from "firebase";
import {IAppStateItem, IAppStateItems} from "../app.types";
import {IDog} from "../dogs/dogs.types";

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
    subject: string;
    message: string;
}

export function IContactFactory(values?: Partial<IContact>): IContact {
    return {name: '', email: '', subject: '', message: '', ...values}
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
// Contact Email
// ------------------------------------
export const CONTACT_EMAIL = 'CONTACT_EMAIL';

interface IContactEmail {
    type: typeof CONTACT_EMAIL;
    payload: IContact;
}

export const ERROR_CONTACT_EMAIL = 'ERROR_CONTACT_EMAIL';

interface IErrorContactEmail {
    type: typeof ERROR_CONTACT_EMAIL;
    payload: Error;
}

// ------------------------------------
// Emails State
// ------------------------------------
export default interface IEmailState {
}

// ------------------------------------
// Emails Actions
// ------------------------------------
export type IEmailsActions =
    IContactEmail |
    IErrorContactEmail
    ;
