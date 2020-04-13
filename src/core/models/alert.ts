import { Action } from "redux";

export enum AlertActions {
  ADD,
  DELETE,
}

export interface Alert {
  id?: string;
  title: string;
  message: string;
  color: "info" | "success" | "warning" | "error";
}

export type AlertState = Array<Alert>;

interface Add extends Action<AlertActions.ADD> {
  payload: Alert;
}

interface Delete extends Action<AlertActions.DELETE> {
  payload: Alert;
}

export type AlertAction = Add | Delete;

export default AlertState;
