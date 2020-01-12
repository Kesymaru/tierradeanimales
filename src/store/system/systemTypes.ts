export interface ISystemState {
    notifications: INotification[];
    loading: boolean;
    errors?: Error[];
}

// -------------------------
// Loading
export const LOADING = 'LOADING';

interface ILoadingAction {
    type: typeof LOADING;
    payload: boolean;
}

// -------------------------
// Errors
export const ERROR = 'ERROR';

interface IErrorAction {
    type: typeof ERROR;
    status?: string|number;
    payload: Error;
}

// -------------------------
// Notifications
export interface INotification {
    title: string;
    message: string;
    type?: string;
}

export const NOTIFICATION = 'NOTIFICATION';

interface INotificationAction {
    type: typeof NOTIFICATION,
    payload: INotification,
}

export type TSystemActions =
    ILoadingAction |
    IErrorAction |
    INotificationAction
    ;
