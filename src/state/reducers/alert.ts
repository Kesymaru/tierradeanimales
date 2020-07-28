import { INIT_ALERT_STATE } from "@constants/alert";
import { AlertState, AlertAction, AlertActions } from "@models/alert";

export function AlertReducer(
  state: AlertState = INIT_ALERT_STATE,
  action: AlertAction
): AlertState {
  switch (action.type) {
    case AlertActions.ADD:
      return { ...action.payload };
    case AlertActions.DELETE:
      return INIT_ALERT_STATE;
    default:
      return state;
  }
}

export default AlertReducer;
