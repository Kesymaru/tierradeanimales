import {Dispatch} from "redux";

import {ERROR_RESET_PASSWORD, ERROR_UPDATE_PASSWORD, ERROR_USER, RECEIVE_USER, TUserActions} from './userTypes'
import Firebase from "../../constants/firebase";
import SystemActions from "../system/systemActions";

/**
 * user Actions
 */
class UserActions {
    public static ReceiveUser(payload: any): TUserActions {
        return {type: RECEIVE_USER, payload,}
    }

    public static ErrorUser(payload: Error): TUserActions {
        return {type: ERROR_USER, payload}
    }

    public static UpdatePassword(password: string): Function {
        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());
            Firebase.updatePassword(password)
                .then(() => dispatch(SystemActions.Notification({
                    title: 'Password Changed',
                    message: 'Password changed successfully'
                })))
                .catch(error => dispatch(UserActions.ErrorUpdatePassword(error)))
        }
    }

    public static ErrorUpdatePassword(payload: Error): TUserActions {
        return {type: ERROR_UPDATE_PASSWORD, payload}
    }

    public static ResetPassword(password: string): Function {
        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());
            Firebase.resetPassword(password)
                .then(() => dispatch(SystemActions.Notification({
                    title: 'Password Reset Email',
                    message: 'Reset email has been sent'
                })))
                .catch(error => dispatch(UserActions.ErrorResetPassword(error)));
        }
    }

    public static ErrorResetPassword(payload: Error): TUserActions {
        return {type: ERROR_RESET_PASSWORD, payload}
    }
}

export default UserActions;
