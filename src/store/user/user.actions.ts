import {Dispatch} from "redux";

import {ERROR_RESET_PASSWORD, ERROR_UPDATE_PASSWORD, ERROR_USER, IUser, RECEIVE_USER, TUserActions} from './user.types'
import Firebase from "../../constants/firebase";
import SystemActions from "../system/system.actions";

/**
 * user Actions
 */
class UserActions {
    public static ReceiveUser(payload: IUser): TUserActions {
        return {type: RECEIVE_USER, payload,}
    }

    public static ErrorUser(payload: Error): TUserActions {
        return {type: ERROR_USER, payload}
    }

    public static UpdateProfile(user: IUser): Function {
        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());

            let promise = null;
            let updateUser = (userData: IUser) => Firebase.updateProfile(userData);

            // update avatar img
            if (user.avatar)
                promise = Firebase.saveAndDownloadFile(user.uid, user.avatar.file, 'avatar')
                    .then(url => {
                        console.log('user avatar uploaded', url);
                        return updateUser({...user, photoURL: url })
                    });
            else
                promise = updateUser(user);

            promise
                .then(() => dispatch(SystemActions.Notify('Profile Updated')))
                .catch(error => dispatch(SystemActions.Error(error)))
                .finally(() => dispatch(SystemActions.Loading()))
        }
    }

    public static UpdatePassword(password: string): Function {
        console.log('UpdatePassword', password);

        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());

            Firebase.updatePassword(password)
                .then(() => dispatch(SystemActions.Notify('Password changed successfully')))
                .catch(error => dispatch(UserActions.ErrorUpdatePassword(error)))
                .finally(() => SystemActions.Loading(false));
        }
    }

    public static ErrorUpdatePassword(payload: Error): TUserActions {
        return {type: ERROR_UPDATE_PASSWORD, payload}
    }

    public static ResetPassword(password: string): Function {
        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());
            Firebase.resetPassword(password)
                .then(() => dispatch(SystemActions.Notify('Password reset successfully')))
                .catch(error => dispatch(UserActions.ErrorResetPassword(error)));
        }
    }

    public static ErrorResetPassword(payload: Error): TUserActions {
        return {type: ERROR_RESET_PASSWORD, payload}
    }
}

export default UserActions;
