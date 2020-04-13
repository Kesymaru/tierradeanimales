import { Action } from "redux";

export enum AlertActions {
  ADD = "ALERT_ADD",
  DELETE = "ALERT_DELETE",
}

export interface Alert {
  id?: string;
  title?: string;
  message: string;
  shown?: boolean;
  color: "info" | "success" | "warning" | "error";
}

export type AlertState = Alert | null;

interface Add extends Action<AlertActions.ADD> {
  payload: Alert;
}

interface Delete extends Action<AlertActions.DELETE> {
  payload: Alert;
}

export type AlertAction = Add | Delete;

export default AlertState;
