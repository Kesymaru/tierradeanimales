import {Dispatch} from "redux";

import {IFile} from "../../constants/firebase/storage";
import {ERROR_RESET_PASSWORD, ERROR_UPDATE_PASSWORD, ERROR_USER, IUser, RECEIVE_USER, TUserActions} from './user.types'
import SystemActions from "../system/system.actions";
import Auth from "../../constants/firebase/auth";
import Actions from "../actions";

class UserActions extends Actions{
    protected static databaseConfig = {
        name: 'user',
    };
    protected static storageConfig = {
        name: 'user'
    };

    public static ReceiveUser(payload: IUser): TUserActions {
        return {type: RECEIVE_USER, payload}
    }

    public static ErrorUser(payload: Error): TUserActions {
        return {type: ERROR_USER, payload}
    }

    public static UpdateProfile(user: IUser): Function {
        return async (dispatch: Dispatch) => {
            try {
                if (user.avatar)
                    user.avatar = await UserActions.storage.save(user.avatar) as IFile;
                await Auth.UpdateUser(user);

                dispatch(SystemActions.Notify('Profile Updated'));
            } catch (error) {
                dispatch(SystemActions.Error(error));
            }
        }
    }

    public static UpdatePassword(password: string): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading());
                await Auth.UpdatePassword(password);
                dispatch(SystemActions.Notify('Password changed successfully'))
            } catch (error) {
                dispatch(UserActions.ErrorUpdatePassword(error))
            } finally {
                SystemActions.Loading(false)
            }
        }
    }

    public static ErrorUpdatePassword(payload: Error): TUserActions {
        return {type: ERROR_UPDATE_PASSWORD, payload}
    }

    public static ResetPassword(password: string): Function {
        return (dispatch: Dispatch) => {
            dispatch(SystemActions.Loading());

            Auth.ResetPassword(password)
                .then(() => dispatch(SystemActions.Notify('Password reset successfully')))
                .catch(error => dispatch(UserActions.ErrorResetPassword(error)));
        }
    }

    public static ErrorResetPassword(payload: Error): TUserActions {
        return {type: ERROR_RESET_PASSWORD, payload}
    }
}

// const UserActions = new User('users', 'users');
export default UserActions;
