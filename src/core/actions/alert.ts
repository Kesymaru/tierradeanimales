import { v4 as uuid } from "uuid";

import { Alert, AlertAction, AlertActions } from "../models/alert";

export function Add(payload: Alert): AlertAction {
  payload = { ...payload, id: uuid() };
  return { type: AlertActions.ADD, payload };
}

export function Delete(payload: Alert): AlertAction {
  return { type: AlertActions.DELETE, payload };
}
