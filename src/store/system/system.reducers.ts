import {CLOSE_NOTIFICATION, ERROR, ISystemState, LOADING, NOTIFY, TSystemActions} from "./system.types";

const InitState: ISystemState = {
    notifications: [],
    loading: false,
    errors: [],
};

function SystemReducers (
    state: ISystemState = InitState,
    action: TSystemActions): ISystemState {

    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case ERROR:
            return {
                ...state,
                loading: false,
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
                notifications: state.notifications.map(n => (n === action.payload ? {...n, open: false}: n))
            };

        default:
            return state;
    }
}

export default SystemReducers;

