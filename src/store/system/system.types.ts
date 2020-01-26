export interface INotification {
    message: string;
    open: boolean;
    type?: string;
    duration?: number;
}

export interface ISystemLoading {
    [key: string]: boolean;
}

export interface ISystemState {
    notifications: INotification[];
    loading: boolean;
    loadingStatus: ISystemLoading;
    errors?: Error[];
}

// -------------------------
// Loading
export const LOADING = 'LOADING';

interface ILoading {
    type: typeof LOADING;
    payload: ISystemLoading;
}

// -------------------------
// Errors
export const ERROR = 'ERROR';

interface IError {
    type: typeof ERROR;
    status?: string|number;
    payload: Error;
}


export const NOTIFY = 'NOTIFY';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';

interface INotify {
    type: typeof NOTIFY,
    payload: INotification,
}

interface ICloseNotification {
    type: typeof CLOSE_NOTIFICATION;
    payload: INotification;
}

export type TSystemActions =
    ILoading |

    IError |

    INotify |
    ICloseNotification
    ;
