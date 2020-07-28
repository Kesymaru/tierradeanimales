import { useLocation } from "react-router-dom";

import Route from "../models/route";
import findRoute from "../utils/findRoute";

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
