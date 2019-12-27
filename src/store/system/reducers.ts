import {ISystemState, TSystemActions, UPDATE_SESSION} from "./types";

const InitState: ISystemState = {
    loggedIn: false,
    session: '',
    user: {
        name: '',
        email: ''
    }
};

export function SystemReducers (
    state: ISystemState = InitState,
    action: TSystemActions): ISystemState {

    switch (action.type) {
        case UPDATE_SESSION:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
