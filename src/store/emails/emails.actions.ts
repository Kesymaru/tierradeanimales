import {Dispatch} from "redux";

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
function SentEmail(email: IEmail): Function {
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
function SentContactEmail(payload: IContact): IEmailsActions {
    return {type: CONTACT_EMAIL, payload};
}

