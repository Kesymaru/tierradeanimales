import {ERROR, ISystemState, LOADING, NOTIFICATION, TSystemActions} from "./systemTypes";

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

        case NOTIFICATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.payload
                ]
            };

        default:
            return state;
    }
}

export default SystemReducers;

