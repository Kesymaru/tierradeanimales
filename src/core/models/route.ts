import {
  ComponentClass,
  ComponentType,
  FunctionComponent,
} from "@/core/models/node_modules/react";

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

export interface RouteDefaults extends Pick<Route, "exact" | "auth"> {}

export default Route;
