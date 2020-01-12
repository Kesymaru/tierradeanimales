import {ERROR, INotification, LOADING, NOTIFICATION, TSystemActions} from "./systemTypes";

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

    public static Notification(payload: INotification): TSystemActions {
        return {
            type: NOTIFICATION,
            payload,
        }
    }
}

export default SystemActions;
