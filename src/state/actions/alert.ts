import { v4 as uuid } from "uuid";

import { Alert, AlertAction, AlertActions } from "../../models/alert";

export function AddAlert(payload: Alert): AlertAction {
  console.log("add alert", payload);
  payload = { ...payload, id: uuid(), shown: false };
  return { type: AlertActions.ADD, payload };
}

export function DeleteAlert(payload: Alert): AlertAction {
  return { type: AlertActions.DELETE, payload };
}
