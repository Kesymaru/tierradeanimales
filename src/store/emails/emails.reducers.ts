import IEmailState, {IEmailsActions} from "./emails.types";

const InitState: IEmailState = {};

function EmialsReducets(
    state: IEmailState = InitState,
    action: IEmailsActions
): IEmailState {
    switch (action.type) {
        default:
            return state;
    }
}
