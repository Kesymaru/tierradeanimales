import {
    CLOSE_NOTIFICATION,
    ERROR,
    INotification,
    LOADING,
    NOTIFY,
    TSystemActions
} from "./system.types";

export function Loading(value: boolean = true, name: string = "system"): TSystemActions {
    return {
        type: LOADING,
        payload: {
            [`${name}`]: value
        }
    }
}

export function Error(payload: Error): TSystemActions {
    return {type: ERROR, payload}
}

// TODO migrate this into a notification store
export function Notify(message: string, duration: number = 6000): TSystemActions {
    return {
        type: NOTIFY,
        payload: {
            message,
            open: true,
            duration,
        },
    }
}

export function CloseNotification(payload: INotification): TSystemActions {
    return {
        type: CLOSE_NOTIFICATION,
        payload,
    }
}
