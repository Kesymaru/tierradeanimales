import { ComponentClass, ComponentType, FunctionComponent } from "react";

export interface RouteParam {
  [paramName: string]: string | number | boolean | undefined;
}

export interface Route {
  name: string;
  path: string;
  exact?: boolean;
  auth?: boolean;
  component: FunctionComponent<any> | ComponentClass<any>;

  icon?: ComponentType<any>;
  parent?: Route;
  defaultParams?: RouteParam;
  getPath: (params?: RouteParam) => string;
}

export interface CreateRoute extends Omit<Route, "getPath" | "exact" | "auth"> {
  exact?: boolean;
  auth?: boolean;
}

export interface RouteDefaults extends Pick<Route, "exact" | "auth"> {}

export default Route;
