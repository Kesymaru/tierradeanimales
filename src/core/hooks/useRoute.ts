import { useLocation } from "react-router-dom";

import Route from "../models/route";
import findRoute from "../utils/findRoute";

export function useRoute(routes: Array<Route>): Route | undefined {
  const location = useLocation();
  return findRoute(routes, location);
}

export default useRoute;
