import IEmailState, {IEmailsActions} from "./emails.types";
import { TStatus } from "../app.types";

const InitState: IEmailState = {
    status: TStatus.Empty,
    data: null,
    id: null
};

function EmailReducers(
    state: IEmailState = InitState,
    action: IEmailsActions
): IEmailState {
    switch (action.type) {
        case "FETCH_EMAIL":
            return {
                ...InitState,
                status: TStatus.Fetching,
            };

            case "LOAD_EMAIL":
                return {
                    status: TStatus.Loaded,
                    data: action.payload,
                    id: action.payload.id
                };

            case "ERROR_EMAIL":
                return {
                    ...InitState,
                    status: TStatus.Error,
                    error: action.payload
                };

        default:
            return state;
    }
}

export default EmailReducers;
