import {SIGN_IN, SIGN_OUT, SIGN_UP, TSystemActions} from "./types";

export function SignInAction(email: string, password: string, remember: boolean = false): TSystemActions {
    return {
        type: SIGN_IN,
        payload: {email, password, remember},
    }
}

export function SingUpAction(email: string, password: string): TSystemActions {
    return {
        type: SIGN_UP,
        payload: {email, password},
    }
}

export function SingOutAction(): TSystemActions {
    return {
        type: SIGN_OUT,
        payload: null,
    }
}
