import {CLOSE_NOTIFICATION, ERROR, INotification, LOADING, NOTIFY, TSystemActions} from "./system.types";

class SystemActions {
    public static Loading(loading: boolean = true): TSystemActions {
        return {
            type: LOADING,
            payload: loading
        }
    }

    public static Error(payload: Error): TSystemActions {
        return {
            type: ERROR,
            payload,
        }
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
