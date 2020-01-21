export interface IUserAvatar {
    img: string;
    file: File;
}

export interface IUser {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    avatar?: IUserAvatar;
    refreshToken?: string;
}

export interface IUserErrors {
    user?: Error;
    updatePassword?: Error;
    resetPassword?: Error;
}

export interface IUserState {
    user: IUser|null;
    errors?: IUserErrors;
}

// ------------------------------------
// load user
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
// update password
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
