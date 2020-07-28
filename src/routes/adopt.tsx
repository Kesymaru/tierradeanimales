import PetsIcon from "@material-ui/icons/Pets";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import { Adopt, DetailAdopt } from "@screens";

// ------------------------------------
// Home
// ------------------------------------
export const ADOPT_ROUTE: Route = createRoute({
  name: "Adopt",
  path: "/adopt",
  component: Adopt,
  icon: PetsIcon,
});

export const ADOPT_DETAIL_ROUTE: Route = createRoute({
  name: "Adopt",
  path: `${ADOPT_ROUTE.path}/:id`,
  component: DetailAdopt,
  parent: ADOPT_ROUTE,
});

export const ADOPT_ROUTES: Array<Route> = [ADOPT_DETAIL_ROUTE, ADOPT_ROUTE];

export default ADOPT_ROUTES;
