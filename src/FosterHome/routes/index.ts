import HouseIcon from "@material-ui/icons/House";
import EditIcon from "@material-ui/icons/Edit";

import { RouteFactory } from "@/routes";

import ADMIN_DASHBOARD from "@/Dashboard/components/AdminDashboard";
import { Homes as FosterHomes, EditHome } from "@/FosterHome/components";

export const ADMIN_HOMES_ROUTE: Route = RouteFactory({
  name: "Foster Homes",
  path: "/homes",
  auth: true,
  component: FosterHomes,
  parent: ADMIN_DASHBOARD,
  icon: HouseIcon,
});

export const ADMIN_HOME_EDIT_ROUTE: Route = RouteFactory({
  name: "Edit Dashboard",
  path: `${ADMIN_HOMES_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditHome,
  parent: ADMIN_HOMES_ROUTE,
  icon: EditIcon,
});

const HOMES_ROUTES: Route[] = [ADMIN_HOME_EDIT_ROUTE, ADMIN_HOMES_ROUTE];

export default HOMES_ROUTES;
