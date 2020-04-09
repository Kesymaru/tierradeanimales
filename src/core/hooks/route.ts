import { generatePath, matchPath } from "react-router";
import * as H from "history";
import { useLocation, useParams } from "react-router-dom";

import {
  Route,
  RouteParam,
  RouteFactoryParams,
  RouteDefaults,
} from "../models/route";

// ------------------------------------
// Functions
// ------------------------------------
export function RouteFactory(
  params: RouteFactoryParams,
  defaults: RouteDefaults = { auth: false, exact: false }
): Route {
  console.log("factory name:", params.name, params.path);
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

export function findRoute(
  routes: Array<Route>,
  location: H.Location | string
): Route | undefined {
  let pathname = typeof location === "string" ? location : location.pathname;
  return routes.find((route) =>
    matchPath(pathname, {
      path: route.path,
      exact: typeof route.exact === "boolean" ? route.exact : false,
    })
  );
}

// ------------------------------------
// Custom Hooks
// ------------------------------------

export function useId(
  field: string = "id"
): { isNew: boolean; id: string | undefined } {
  const params = useParams() as any;
  const id = params[field];
  const isNew = id && id.toLowerCase() === "new";

  return { isNew, id };
}

/**
 * Hook to get the current matched route
 */
export function useRoute(routes: Array<Route>): Route | undefined {
  const location = useLocation();
  return findRoute(routes, location);
}

/**
 * Hook to get the current route paths in an array
 */
export function useRoutes(routes: Array<Route>): Route[] {
  const location = useLocation();
  const found: Route[] = [];
  let route = findRoute(routes, location);

  if (route) {
    found.push(route);
    while (route && route.parent) {
      route = route.parent;
      found.push(route);
    }
  }
  return found.reverse();
}

export default useRoutes;
