import GroupIcon from "@material-ui/icons/Group";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import DASHBOARD_ROUTE from "./dashboard";
import { Users, DetailsUser } from "@screens/admin";

// ------------------------------------
// Admin Users
// ------------------------------------
export const USERS_ROUTE: Route = createRoute({
  name: "Users",
  path: `${DASHBOARD_ROUTE.path}/users`,
  auth: true,
  admin: true,
  component: Users,
  icon: GroupIcon,
  parent: DASHBOARD_ROUTE,
});

// ------------------------------------
// Admin User profile
// ------------------------------------
export const DETAILS_USER_ROUTE: Route = createRoute({
  name: "Profile",
  path: `${DASHBOARD_ROUTE.path}/users/:id`,
  auth: true,
  component: DetailsUser,
  parent: DASHBOARD_ROUTE,
});

export default USERS_ROUTE;
