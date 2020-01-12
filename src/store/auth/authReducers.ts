import {
    ERROR_SIGN_IN,
    ERROR_SIGN_OUT,
    ERROR_SIGN_UP,
    IAuthState,
    RECEIVE_SIGN_IN,
    RECEIVE_SIGN_OUT,
    REFRESH_TOKEN,
    TAuthActions
} from "./authTypes";

import LocalStorage from "../../constants/localStorage";

const DefaultState: IAuthState = {
    logged: false,
    token: null,
    expire: null,
};
const InitState: IAuthState = {
    ...DefaultState,
    logged: !!LocalStorage.getItem('token'),
    token: LocalStorage.getItem('token'),
};

function AuthReducers(
    state: IAuthState = InitState,
    action: TAuthActions): IAuthState {

    switch (action.type) {
        case ERROR_SIGN_UP:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    signUp: action.payload,
                }
            };

        case RECEIVE_SIGN_IN: {
            LocalStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                logged: true,
            };
        }

        case ERROR_SIGN_IN:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    signIn: action.payload,
                }
            };

        case RECEIVE_SIGN_OUT: {
            LocalStorage.remvoeItem('token');
            return {...DefaultState};
        }

        case ERROR_SIGN_OUT:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    signOut: action.payload,
                }
            };

        case REFRESH_TOKEN: {
            console.log("refresh token reducers");
            return {...state}
        }

        default:
            return state;
    }
}

export default AuthReducers;
