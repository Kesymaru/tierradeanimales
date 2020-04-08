import HouseIcon from "@material-ui/icons/House";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@core/models/route";
import { RouteFactory } from "@core/hooks/route";
import { ADMIN_DASHBOARD_ROUTE } from "@/Dashboard/routes";
import { FosterHomes, EditFosterHome } from "@/FosterHome/components";

export const FOSTER_HOMES_ROUTE: Route = RouteFactory({
  name: "Foster Homes",
  path: "/homes",
  auth: true,
  component: FosterHomes,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: HouseIcon,
});

export const EDIT_FOSTER_HOME_ROUTE: Route = RouteFactory({
  name: "Edit Dashboard",
  path: `${FOSTER_HOMES_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditFosterHome,
  parent: FOSTER_HOMES_ROUTE,
  icon: EditIcon,
});

const ROUTES: Route[] = [EDIT_FOSTER_HOME_ROUTE, FOSTER_HOMES_ROUTE];

export default ROUTES;
