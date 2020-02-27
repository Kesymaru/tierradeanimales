import {DELAY_REFRESH_TOKEN, ERROR_SIGN_IN, ERROR_SIGN_OUT, ERROR_SIGN_UP, RECEIVE_SIGN_IN, RECEIVE_SIGN_OUT, TAuthActions} from "./auth.types";
import {Dispatch} from "redux";

import Auth from "../../constants/firebase/auth";
import SystemActions from "../system/system.actions";
import {ReceiveUser} from "../user/user.actions";
import {IUser} from "../user/user.types";

const Expiration: number = 1000;
const auth = new Auth();

export function SignIn(email: string, password: string, remember: boolean = false): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(SystemActions.Loading());
            const {user} = await auth.SignIn(email, password);

            if(user) {
                dispatch(ReceiveSingIn( user.refreshToken));
                dispatch(ReceiveUser(user as IUser));
            }
            else dispatch(ErrorSingIn(new Error('invalid user received')));
        } catch (error) {
            dispatch(ErrorSingIn(error))
        } finally {
            dispatch(SystemActions.Loading(false))
        }
    }
}

function ReceiveSingIn(token: string, expire: Date = (new Date())): TAuthActions {
    return {
        type: RECEIVE_SIGN_IN,
        payload: { token, expire, },
    }
}

function ErrorSingIn(payload: Error): TAuthActions {
    return {
        type: ERROR_SIGN_IN,
        payload,
    }
}

export function SingUp(email: string, password: string): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(SystemActions.Loading());
            await auth.SignUp(email, password);
        } catch (error) {
            dispatch(ErrorSignUp(error))
        }
    }
}

function ErrorSignUp(payload: Error): TAuthActions {
    return {
        type: ERROR_SIGN_UP,
        payload,
    }
}

export function SingOut(): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(SystemActions.Loading());
            await auth.SignOut();
            dispatch(ReceiveSingOut());
        } catch (error) {
            dispatch(ErrorSignOut(error))
        } finally {
            dispatch(SystemActions.Loading(false))
        }
    }
}

function ReceiveSingOut(): TAuthActions {
    return { type: RECEIVE_SIGN_OUT }
}

function ErrorSignOut(payload: Error): TAuthActions {
    return {type: ERROR_SIGN_OUT, payload}
}

export function DelayRefreshToken(delay: number = Expiration): TAuthActions {
    return {
        type: DELAY_REFRESH_TOKEN,
        delay,
        action: RefresToken
    }
}

export function RefresToken(): Function {
    return (dispatch: Dispatch) => {
        let token = 'new test token';
        dispatch(ReceiveSingIn(token));
    }
}
