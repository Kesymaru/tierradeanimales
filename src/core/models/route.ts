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
  customName?: (params: CustomName, route: Route) => string;
}

export interface CreateRoute extends Omit<Route, "getPath" | "exact" | "auth"> {
  exact?: boolean;
  auth?: boolean;
}

export interface RouteDefaults
  extends Pick<Route, "exact" | "auth" | "customName"> {}

export interface RouteParams {
  id: string | undefined;
  isNew: boolean;
  params: Record<string, any>;
}

export interface CustomName {
  id: string | undefined;
  isNew: boolean;
  params: Record<string, any>;
  t: Function;
}

export default Route;
