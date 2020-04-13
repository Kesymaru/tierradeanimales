import { INIT_ALERT_STATE } from "./../constants/alert";
import { AlertState, AlertAction, AlertActions } from "./../models/alert";

export function AlertReducer(
  state: AlertState = INIT_ALERT_STATE,
  action: AlertAction
): AlertState {
  switch (action.type) {
    case AlertActions.ADD:
      return [...state, action.payload];
    case AlertActions.DELETE:
      return state.filter((alert) => alert.id !== action.payload.id);
    default:
      return state;
  }
}

export default AlertReducer;
