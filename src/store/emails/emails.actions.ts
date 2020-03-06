import {Dispatch} from "redux";
import i18n from "i18next";

import Database from "../../constants/firebase/database";
import {IContact, IEmail, IEmailsStats, IEmailsStatsFactory, IEmailsActions} from "./emails.types";

import {CONTACT_EMAIL} from "./emails.types";

// ------------------------------------
// Emails Actions Config
// ------------------------------------
const database = new Database<IEmail, IEmailsStats>({
    path: 'emails',
    statsFactory: IEmailsStatsFactory,
});

// ------------------------------------
// Email
// ------------------------------------
export function SentEmail(email: IEmail): Function {
    return async (dispatch: Dispatch) => {
        try {
            email = await database.add(email) as IEmail;
        } catch (error) {

        }
    }
}

// ------------------------------------
// Contact Email
// ------------------------------------
export function SentContactEmail(contact: IContact): Function {
    return async (dispatch: Dispatch) => {
        const date = new Date();
        const labels = {
            date: i18n.t('app.date'),
            name: i18n.t('contact.name'),
            email: i18n.t('contact.email'),
            message: i18n.t('contact.message'),
        };
        const html = `
            <b>${labels.date}:</b>${date.getFullYear()}/${date.getMonth()}/${date.getDay()}</br>
            <b>${labels.name}:</b>${contact.name}</br>
            <b>${labels.email}:</b>${contact.email}</br>
            <b>${labels.message}</b>
            <p>${contact.message}</p>
        `;

        await SentEmail({
            to: process.env.REACT_APP_EMAIL,
            message: {
                subject: i18n.t('contact.title'),
                html
            }
        });

        // TODO dispathc the load email
        //dispatch()
    }
}

