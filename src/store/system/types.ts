export interface ICredentials {
    email: string;
    password: string;
}

export interface IUser extends ICredentials{
    name?: string;
    uid?: string;
}

export interface ISignIn extends ICredentials {
    remember?: boolean
}

export interface ISystemState {
    user: IUser|null;
    loggedIn: boolean;
    loading: boolean;
}

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

interface ISignUpAction {
    type: typeof SIGN_UP;
    payload: ICredentials;
}

interface ISignInAction {
    type: typeof SIGN_IN;
    payload: ISignIn;
}
interface ISignOutAction {
    type: typeof SIGN_OUT;
    payload?: any;
}

export type TSystemActions = ISignUpAction | ISignInAction | ISignOutAction;

