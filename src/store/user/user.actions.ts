import {Dispatch} from "redux";

import {IFile} from "../../constants/firebase/storage";
import {ERROR_RESET_PASSWORD, ERROR_UPDATE_PASSWORD, ERROR_USER, IUser, RECEIVE_USER, TUserActions} from './user.types'

import Storage from "../../constants/firebase/storage";
import Auth from "../../constants/firebase/auth";
import SystemActions from "../system/system.actions";

// ------------------------------------
// User actions
// ------------------------------------
const auth = new Auth();
const storage = new Storage({path: 'users'});

export function ReceiveUser(payload: IUser): TUserActions {
    return {type: RECEIVE_USER, payload}
}

export function ErrorUser(payload: Error): TUserActions {
    return {type: ERROR_USER, payload}
}

export function UpdateProfile(user: IUser): Function {
    return async (dispatch: Dispatch) => {
        try {
            if (user.avatar) user.avatar = await storage.save(user.avatar) as IFile;
            await auth.UpdateUser(user);
            dispatch(SystemActions.Notify('Profile Updated'));
        } catch (error) {
            dispatch(SystemActions.Error(error));
        }
    }
}

export function UpdatePassword(password: string): Function {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(SystemActions.Loading());
            await auth.UpdatePassword(password);
            dispatch(SystemActions.Notify('Password changed successfully'))
        } catch (error) {
            dispatch(ErrorUpdatePassword(error))
        } finally {
            SystemActions.Loading(false)
        }
    }
}

export function ErrorUpdatePassword(payload: Error): TUserActions {
    return {type: ERROR_UPDATE_PASSWORD, payload}
}

export function ResetPassword(password: string): Function {
    return (dispatch: Dispatch) => {
        dispatch(SystemActions.Loading());

        auth.ResetPassword(password)
            .then(() => dispatch(SystemActions.Notify('Password reset successfully')))
            .catch(error => dispatch(ErrorResetPassword(error)));
    }
}

export function ErrorResetPassword(payload: Error): TUserActions {
    return {type: ERROR_RESET_PASSWORD, payload}
}
