import {ISystemState, TSystemActions, UPDATE_SESSION} from "./types";

export function UpdateSessionAction(newSession: ISystemState): TSystemActions {
    return {
        type: UPDATE_SESSION,
        payload: newSession,
    }
}
