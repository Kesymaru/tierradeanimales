import HouseIcon from "@material-ui/icons/House";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import { ADMIN_DASHBOARD_ROUTE } from "./dashboard";
import { FosterHomes, EditFosterHome } from "@screens";

export const FOSTER_HOMES_ROUTE = createRoute({
  name: "Foster Homes",
  path: "/fosterHomes",
  auth: true,
  admin: true,
  component: FosterHomes,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: HouseIcon,
});

export const EDIT_FOSTER_HOME_ROUTE = createRoute({
  name: "Edit Foster Home",
  path: `${FOSTER_HOMES_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditFosterHome,
  parent: FOSTER_HOMES_ROUTE,
  icon: EditIcon,
});

export const FOSTER_HOME_ROUTES: Route[] = [
  EDIT_FOSTER_HOME_ROUTE,
  FOSTER_HOMES_ROUTE,
];

export default FOSTER_HOME_ROUTES;
