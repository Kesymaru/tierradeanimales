import {Dispatch} from "redux";

import {IFile} from "../../constants/firebase/storage";
import {ERROR_RESET_PASSWORD, ERROR_UPDATE_PASSWORD, ERROR_USER, IUser, RECEIVE_USER, TUserActions} from './user.types'

import Storage from "../../constants/firebase/storage";
import Auth from "../../constants/firebase/auth";
import {Notify} from "../system/system.actions";

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
            dispatch(Notify('Profile Updated'));
        } catch (error) {
            // TODO implement error
        }
    }
}

// ------------------------------------
// Update Password
// ------------------------------------
function ErrorUpdatePassword(payload: Error): TUserActions {
    return {type: ERROR_UPDATE_PASSWORD, payload}
}

export function UpdatePassword(password: string): Function {
    return async (dispatch: Dispatch) => {
        try {
            await auth.UpdatePassword(password);
            dispatch(Notify('Password changed successfully'))
        } catch (error) {
            dispatch(ErrorUpdatePassword(error))
        }
    }
}

// ------------------------------------
// Reset Password
// ------------------------------------
function ErrorResetPassword(payload: Error): TUserActions {
    return {type: ERROR_RESET_PASSWORD, payload}
}

export function ResetPassword(password: string): Function {
    return async (dispatch: Dispatch) => {
        try {
            await auth.ResetPassword(password);
            dispatch(Notify('Password reset successfully'));
        } catch (error) {
            dispatch(ErrorResetPassword(error));
        }
    }
}


