import { matchPath } from "react-router";
import * as H from "history";

import Route from "../models/route";

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

export default findRoute;
