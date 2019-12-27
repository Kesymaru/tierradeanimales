export interface IUser {
    name: string;
    email: string;
}

export interface ISystemState {
    user: IUser|null;
    loggedIn: boolean;
    session: string;
}

export const UPDATE_SESSION = 'UPDATE_SESSION';

interface IUpdateSessionAction {
    type: typeof UPDATE_SESSION;
    payload: ISystemState;
}

export type TSystemActions = IUpdateSessionAction;
