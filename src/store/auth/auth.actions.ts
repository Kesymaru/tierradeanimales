import {
    DELAY_REFRESH_TOKEN,
    ERROR_SIGN_IN,
    ERROR_SIGN_OUT,
    ERROR_SIGN_UP,
    RECEIVE_SIGN_IN,
    RECEIVE_SIGN_OUT,
    TAuthActions
} from "./auth.types";
import {Dispatch} from "redux";

import Firebase from "../../constants/firebase";
import SystemActions from "../system/system.actions";
import UserActions from "../user/user.actions";
import {IUser} from "..";

/**
 * Auth Action creator
 */
class AuthActions {
    public static readonly Expiration: number = 1000;

    public static SignIn(email: string, password: string, remember: boolean = false): Function {
        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());

            Firebase.signIn(email, password)
                .then(({user}) => {
                    if(user) {
                        dispatch(AuthActions.ReceiveSingIn( user.refreshToken));
                        dispatch(UserActions.ReceiveUser(user as IUser));
                    }
                })
                .catch(error => dispatch(AuthActions.ErrorSingIn(error)))
                .finally(() => dispatch(SystemActions.Loading(false)))
        }
    }

    public static ReceiveSingIn(token: string, expire: Date = (new Date())): TAuthActions {
        console.log('ReceiveSingInAction', token);
        return {
            type: RECEIVE_SIGN_IN,
            payload: { token, expire, },
        }
    }

    public static ErrorSingIn(payload: Error): TAuthActions {
        return {
            type: ERROR_SIGN_IN,
            payload,
        }
    }

    public static SingUp(email: string, password: string): Function {
        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());

            Firebase.signUp(email, password)
                .catch(error => dispatch(AuthActions.ErrorSignUp(error)));
        }
    }

    public static ErrorSignUp(payload: Error): TAuthActions {
        return {
            type: ERROR_SIGN_UP,
            payload,
        }
    }

    public static SingOut(): Function {
        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());

            Firebase.signOut()
                .then(() => dispatch(AuthActions.ReceiveSingOut()))
                .catch(error => dispatch(AuthActions.ErrorSignOut(error)))
                .finally(() => dispatch(SystemActions.Loading(false)));
        }
    }

    public static ReceiveSingOut(): TAuthActions {
        return { type: RECEIVE_SIGN_OUT, }
    }

    public static ErrorSignOut(payload: Error): TAuthActions {
        return {
            type: ERROR_SIGN_OUT,
            payload,
        }
    }

    public static DelayRefreshToken(delay: number = AuthActions.Expiration): TAuthActions {
        console.log('delay refresh token action');
        return {
            type: DELAY_REFRESH_TOKEN,
            delay,
            action: AuthActions.RefresToken
        }
    }

    public static RefresToken(): Function {
        return (dispatch: Dispatch) => {
            console.log('refresh token!');

            let token = 'new test token';

            dispatch(AuthActions.ReceiveSingIn(token));
        }
    }
}

export default AuthActions;
