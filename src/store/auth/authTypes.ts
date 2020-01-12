
interface IAutheErrors {
    signUp?: Error;
    signIn?: Error;
    signOut?: Error;
}

export interface ISingIn {
    token: string|null;
    expire: Date|null;
}

export interface IAuthState extends ISingIn {
    logged: boolean;
    errors?: IAutheErrors|null;
}

// ------------------------------------
// sing up
// ------------------------------------
export const ERROR_SIGN_UP = 'ERROR_SIGN_UP';

interface IErrorSignUp {
    type: typeof ERROR_SIGN_UP;
    payload: Error;
}

// ------------------------------------
// sing in
// ------------------------------------
export const RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN';
export const ERROR_SIGN_IN = 'ERROR_SIGN_IN';

interface IReceiveSignIn {
    type: typeof RECEIVE_SIGN_IN;
    payload: ISingIn;
}

interface IErrorSignIn {
    type: typeof ERROR_SIGN_IN;
    payload: Error;
}

// ------------------------------------
// sing out
// ------------------------------------
export const RECEIVE_SIGN_OUT = 'RECEIVE_SIGN_OUT';
export const ERROR_SIGN_OUT = 'ERROR_SIGN_OUT';

interface IReceiveSignOut {
    type: typeof RECEIVE_SIGN_OUT;
}

interface IErrorSignOut {
    type: typeof ERROR_SIGN_OUT;
    payload: Error;
}

// ------------------------------------
//
// ------------------------------------
export const DELAY_REFRESH_TOKEN = 'DELAY_REFRESH_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

interface IDelayRefreshToken {
    type: typeof DELAY_REFRESH_TOKEN;
    delay: number;
    action: Function;
}

interface IRefreshToken {
    type: typeof REFRESH_TOKEN;
}

// System Actions Type
export type TAuthActions =
    IErrorSignUp |

    IReceiveSignIn |
    IErrorSignIn |

    IReceiveSignOut |
    IErrorSignOut |

    IDelayRefreshToken |
    IRefreshToken
    ;
