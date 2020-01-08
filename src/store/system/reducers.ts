import {ISystemState, SIGN_IN, SIGN_OUT, SIGN_UP, TSystemActions} from "./types";
import Firebase from "../../constants/firebase";

const InitState: ISystemState = {
    loggedIn: false,
    user: null,
    loading: false,
};

const firebase = new Firebase();

export function SystemReducers (
    state: ISystemState = InitState,
    action: TSystemActions): ISystemState {

    switch (action.type) {
        case SIGN_UP: {
            firebase.signUp(action.payload)
                .then(user => {
                    console.log('sing up action ', user)
                });

            return {
                ...state,
                loading: true
            };
        }

        case SIGN_IN: {
            firebase.signIn(action.payload)
                .then(user => {
                    console.log('sign in response', user)
                });
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

