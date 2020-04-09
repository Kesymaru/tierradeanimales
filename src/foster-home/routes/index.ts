import HouseIcon from "@material-ui/icons/House";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@/core/components/node_modules/@core/models/route";
import { RouteFactory } from "@/core/routes/node_modules/@core/hooks/route";
import { ADMIN_DASHBOARD_ROUTE } from "@/dashboard/routes";
import { FosterHomes, EditFosterHome } from "@/foster-home/components";

export const FOSTER_HOMES_ROUTE: Route = RouteFactory({
  name: "Foster Homes",
  path: "/homes",
  auth: true,
  component: FosterHomes,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: HouseIcon,
});

export const EDIT_FOSTER_HOME_ROUTE: Route = RouteFactory({
  name: "Edit Foster Home",
  path: `${FOSTER_HOMES_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditFosterHome,
  parent: FOSTER_HOMES_ROUTE,
  icon: EditIcon,
});

const ROUTES: Route[] = [EDIT_FOSTER_HOME_ROUTE, FOSTER_HOMES_ROUTE];

export default ROUTES;