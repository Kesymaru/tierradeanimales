import {CLOSE_NOTIFICATION, ERROR, INotification, LOADING, NOTIFY, TSystemActions} from "./system.types";

class SystemActions {
    public static Loading(value: boolean = true, name: string = "system"): TSystemActions {
        return {
            type: LOADING,
            payload: {
                [`${name}`]: value
            }
        }
    }

    public static Error(payload: Error): TSystemActions {
        return {type: ERROR, payload}
    }

    public static Notify(message: string, duration: number = 6000): TSystemActions {
        return {
            type: NOTIFY,
            payload: {
                message,
                open: true,
                duration,
            },
        }
    }

    public static CloseNotification(payload: INotification): TSystemActions {
        return {
            type: CLOSE_NOTIFICATION,
            payload,
        }
    }
}

export default SystemActions;
