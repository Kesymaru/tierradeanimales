import {ISystemState, TSystemActions, SIGN_UP, SIGN_OUT} from "./types";
import Firebase from "../../constants/firebase";

const InitState: ISystemState = {
    loggedIn: false,
    user: null,
    loading: false,
};

export function SystemReducers (
    state: ISystemState = InitState,
    action: TSystemActions): ISystemState {

    switch (action.type) {
        case SIGN_UP: {
            let firebase = new Firebase();
            firebase.signUp(action.payload);

            return {
                ...state,
                loading: true
            };
        }

        case SIGN_UP: {
            return {
                ...state,
                loading: true
            };
        }

        case SIGN_OUT:
            return {
                ...InitState
            };

        default:
            return state;
    }
}

