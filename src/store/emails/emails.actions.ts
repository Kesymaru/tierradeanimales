import {Dispatch} from "redux";
import i18n from "i18next";

import Database from "../../constants/firebase/database";
import {
    IContact,
    IEmail,
    IEmailFactory,
    IEmailsStats,
    IEmailsStatsFactory,
    IEmailsActions,
    FETCH_EMAIL,
    LOAD_EMAIL,
    ERROR_EMAIL
} from "./emails.types";

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
function FetchEmail(): IEmailsActions {
    return {type: FETCH_EMAIL};
}

function LoadEmail(payload: IEmail): IEmailsActions {
    return {type: LOAD_EMAIL, payload};
}

function ErrorEmail(payload: Error): IEmailsActions {
    return {type: ERROR_EMAIL, payload}
}

export function SendEmail(email: IEmail): Function {
    return async (dispatch: Dispatch) => {
        try {
            console.log('add email');
            email = await database.add(email) as IEmail;

            // TODO use system action to notify
            dispatch(LoadEmail(email));
        } catch (error) {
            dispatch(ErrorEmail(error))
        }
    }
}

// ------------------------------------
// Contact Email
// ------------------------------------
export function SendContactEmail(contact: IContact): Function {
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

        try {
            const email = await database.add(IEmailFactory({
                to: process.env.REACT_APP_EMAIL,
                message: {
                    subject: i18n.t('contact.title'),
                    html
                }
            })) as IEmail;

            // TODO use system action to notify
            dispatch(LoadEmail(email));
        } catch(error) {
            dispatch(ErrorEmail(error));
        }
    }
}

