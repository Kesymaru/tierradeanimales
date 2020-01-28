import {Dispatch} from "redux";
import {push} from "connected-react-router";
import {generatePath} from "react-router";

import {Database} from "../../constants/firebase";
import {INewVersus, IVersus, LOAD_ALL, LOAD_VERSUS, TVersusActions} from "./versus.types";
import {SystemActions} from "../index";
import {VERSUS_EDIT_ADMIN_ROUTE} from "../../constants";

class VersusActions {

    public static Add(versus: INewVersus): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading(true, 'versus'));
                let id = await Database.Push('versus', versus);
                dispatch(VersusActions.Load({...versus, ...{id}}));
                dispatch(push(generatePath(VERSUS_EDIT_ADMIN_ROUTE.path, {id})));
            } catch (error) {
                dispatch(SystemActions.Error(error));
            } finally {
                dispatch(SystemActions.Loading(false, 'versus'));
            }
        }
    }

    public static Update(versus: IVersus): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading(true, 'versus'));
                await Database.Update(`versus/${versus.id}`, versus);
            } catch (error) {
                dispatch(SystemActions.Error(error));
            } finally {
                dispatch(SystemActions.Loading(false, 'versus'));
            }
        }
    }

    public static Request(id: string): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading(true, 'versus'));

                let versus = await Database.Read(`versus/${id}`);

                dispatch(VersusActions.Load(versus));
            } catch (error) {
                dispatch(SystemActions.Error(error));
            } finally {
                dispatch(SystemActions.Loading(false, 'versus'));
            }
        }
    }

    public static Load(payload: IVersus): TVersusActions {
        console.log('load versus', payload);
        return {type: LOAD_VERSUS, payload}
    }

    public static RequestAll(userId: string): Function {
        console.log('reques all', userId);

        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading(true, 'versus'));

                let versus = await Database.Read('versus', {key: 'userId', value: userId, toArray: true});
                dispatch(VersusActions.LoadAll(versus));
            } catch (error) {

            } finally {
                dispatch(SystemActions.Loading(false, 'versus'));
            }
        }
    }

    public static LoadAll(payload: IVersus[]): TVersusActions {
        console.log('load all action', payload);
        return {type: LOAD_ALL, payload};
    }
}

export default VersusActions;
