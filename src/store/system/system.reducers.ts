import ISystemState, {CLOSE_NOTIFICATION, ERROR, LOADING, NOTIFY, TSystemActions} from "./system.types";

const InitState: ISystemState = {
    notifications: [],
    loading: false,
    loadingStatus: {},
    errors: [],
};

function SystemReducers(
    state: ISystemState = InitState,
    action: TSystemActions): ISystemState {

    switch (action.type) {
        case LOADING: {
            let loadingStatus = {...state.loadingStatus, ...action.payload};
            return {
                ...state,
                loadingStatus,
                loading: Object.keys(loadingStatus).some(k => loadingStatus[k]),
            };
        }

        case ERROR:
            return {
                ...state,
                errors: [
                    ...(state.errors || []),
                    action.payload
                ],
            };

        case NOTIFY:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.payload
                ]
            };

        case CLOSE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.map(n => (n === action.payload ? {...n, open: false} : n))
            };

        default:
            return state;
    }
}

export default SystemReducers;

