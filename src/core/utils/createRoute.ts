import { generatePath } from "react-router";

import { Route, RouteParam, CreateRoute, RouteDefaults } from "../models/route";

export function createRoute(
  params: CreateRoute,
  defaults: RouteDefaults = { auth: false, exact: false }
): Route {
  let _getPath = getPath(params.path, params.defaultParams || {});

  return {
    ...defaults,
    ...params,
    getPath: _getPath,
  } as Route;
}

function getPath(path: string, defaults?: RouteParam): Function {
  return (params?: RouteParam) => {
    params = defaults ? { ...defaults, ...(params || {}) } : params;
    return generatePath(path, params);
  };
}

export default createRoute;
