import { ComponentClass, ComponentType, FunctionComponent } from "react";

export interface RouteParam {
  [paramName: string]: string | number | boolean | undefined;
}

export interface Route {
  name: string;
  path: string;
  getPath: Function;
  exact: boolean;
  auth: boolean;
  component: FunctionComponent<any> | ComponentClass<any>;

  icon?: ComponentType<any>;
  parent?: Route;
  defaultParams?: RouteParam;
}

export interface RouteFactoryParams
  extends Omit<Route, "getPath" | "exact" | "auth"> {
  exact?: boolean;
  auth?: boolean;
}

export interface IAppRouteDefaults extends Pick<Route, "exact" | "auth"> {}
