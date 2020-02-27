import Joi, {ErrorReport} from "@hapi/joi";

import {IFile} from "../../constants/firebase/storage";
import {Validator} from "../../constants/firebase/database";

export interface IUser {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;

    avatar?: IFile;
}

export interface IUserSignIn {
    email: string;
    password: string;
    remember: boolean;
}

export function IUserSignInValidator(value: IUserSignIn | boolean) {
    return Validator(Joi.object({
        email: Joi.string()
            .email({tlds: {allow: false}})
            .label('Email'),
        password: Joi.string().min(3).required().label('Password'),
    }), value, {abortEarly: true, messages: {
        'string.email': 'Custom email message!!'
        }});
}

export interface IUserSignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export function IUserSignUpValidator(value: IUserSignUp | boolean) {
    return Validator(Joi.object({
        firstName: Joi.string()
            .required()
            .label('First Name'),
        lastName: Joi.string()
            .required()
            .label('Last Name'),
        email: Joi.string()
            .email({tlds: {allow: false}})
            .required()
            .label('Email'),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required().label('Password'),
    }), value, {abortEarly: true});
}

export default interface IUserState {
    user: IUser | null;
}

// ------------------------------------
// Load User
// ------------------------------------
export const RECEIVE_USER = 'RECEIVE_USER';
export const ERROR_USER = 'ERROR_USER';

interface IReceiveUser {
    type: typeof RECEIVE_USER;
    payload: IUser;
}

interface IErrorUser {
    type: typeof ERROR_USER;
    payload: Error;
}

// ------------------------------------
// Update Password
// ------------------------------------
export const ERROR_UPDATE_PASSWORD = 'ERROR_UPDATE_PASSWORD';

interface IErrorUpdatePassword {
    type: typeof ERROR_UPDATE_PASSWORD;
    payload: Error;
}

// ------------------------------------
// reset password
// ------------------------------------
export const ERROR_RESET_PASSWORD = 'ERROR_RESET_PASSWORD';

interface IErrorResetPassword {
    type: typeof ERROR_RESET_PASSWORD;
    payload: Error;
}

export type TUserActions =
    IReceiveUser |
    IErrorUser |

    IErrorUpdatePassword |

    IErrorResetPassword
    ;
