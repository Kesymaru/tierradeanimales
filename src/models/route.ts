import { ComponentClass, ComponentType, FunctionComponent } from "react";
import { Action } from "redux";

import { State } from "../models/store";

export interface RouteParam {
  [paramName: string]: string | number | boolean | undefined;
}

export interface Route {
  name: string;
  title?: string;
  path: string;
  exact?: boolean;
  auth?: boolean;
  admin?: boolean;
  component: FunctionComponent<any> | ComponentClass<any>;
  icon?: ComponentType<any>;
  parent?: Route;
  defaultParams?: RouteParam;
  getPath: (params?: RouteParam) => string;
  getName?: () => string;
}

export type Routes = Array<Route>;

export interface CreateRoute extends Omit<Route, "getPath" | "exact" | "auth"> {
  exact?: boolean;
  auth?: boolean;
}

export interface RouteDefaults extends Pick<Route, "exact" | "auth"> {}

export interface RouteParams {
  id: string | undefined;
  isNew: boolean;
  params: Record<string, any>;
}

// ------------------------------------
// Store
// ------------------------------------

export enum RouteActions {
  CHANGE_TITLE = "ROUTE_CHANGE_TITLE",
  RESET = "ROUTE_RESET",
}

export interface RouteState {
  current: Route | null;
}

interface ChangeTitle extends Action<RouteActions.CHANGE_TITLE> {
  payload: Route;
}

interface Reset extends Action<RouteActions.RESET> {}

export type RouteAction = ChangeTitle | Reset;

export default Route;