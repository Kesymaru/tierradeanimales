import HouseIcon from "@material-ui/icons/House";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import DASHBOARD_ROUTE from "./dashboard";
import { FosterHomes, EditFosterHome } from "@screens";

export const FOSTER_HOMES_ROUTE: Route = createRoute({
  name: "Foster Homes",
  path: `${DASHBOARD_ROUTE.path}/fosterHomes`,
  auth: true,
  admin: true,
  component: FosterHomes,
  parent: DASHBOARD_ROUTE,
  icon: HouseIcon,
});

export const EDIT_FOSTER_HOME_ROUTE: Route = createRoute({
  name: "Edit Foster Home",
  path: `${FOSTER_HOMES_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditFosterHome,
  parent: FOSTER_HOMES_ROUTE,
  icon: EditIcon,
});

export default FOSTER_HOMES_ROUTE;
