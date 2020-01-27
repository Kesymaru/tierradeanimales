import {Dispatch} from "redux";

import {Database} from "../../constants/firebase";
import {INewVersus, IVersus} from "./versus.types";
import {SystemActions} from "../index";

class VersusActions {

    public static Add(versus: INewVersus): Function {
        return async (dispatch: Dispatch) => {
            try {
                dispatch(SystemActions.Loading(true, 'versus'));
                let id = await Database.Push('versus', versus);
            } catch (error) {
                dispatch(SystemActions.Error(error));
            } finally {

            }
        }
    }

    public Load(versus: IVersus) {
        return {}
    }
}

export default VersusActions;
