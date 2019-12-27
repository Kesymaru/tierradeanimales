import {ISystemState, TSystemActions, UPDATE_SESSION} from "./types";

export function UpdateSession(newSession: ISystemState): TSystemActions {
    return {
        type: UPDATE_SESSION,
        payload: newSession,
    }
}
