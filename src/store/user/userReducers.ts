import {ERROR_USER, IUserState, RECEIVE_USER, TUserActions} from "./userTypes";

const InitState: IUserState = {
    user: null,
};

function UserReducers (
    state: IUserState = InitState,
    action: TUserActions): IUserState {
    switch (action.type) {
        case RECEIVE_USER:
            return {
                ...state,
                user: action.payload
            };

        case ERROR_USER:
            return {
                ...state,
                errors: {
                    ...(state.errors || []),
                    user: action.payload,
                }
            };

        default:
            return state;
    }
}

export default UserReducers;
