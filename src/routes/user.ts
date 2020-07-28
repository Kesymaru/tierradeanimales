import AccountBoxIcon from "@material-ui/icons/AccountBox";
import GroupIcon from "@material-ui/icons/Group";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import { ADMIN_DASHBOARD_ROUTE, DASHBOARD_ROUTE } from "./dashboard";
import { Account, AdminUsers, UserProfile } from "@screens";

// ------------------------------------
// Admin Users
// ------------------------------------
export const ADMIN_USERS_ROUTE: Route = createRoute({
  name: "Users",
  path: `${ADMIN_DASHBOARD_ROUTE.path}/users`,
  auth: true,
  admin: true,
  component: AdminUsers,
  icon: GroupIcon,
  parent: ADMIN_DASHBOARD_ROUTE,
});

// ------------------------------------
// User profile
// ------------------------------------
export const USER_PROFILE_ROUTE: Route = createRoute({
  name: "Profile",
  path: `${ADMIN_DASHBOARD_ROUTE.path}/profile`,
  auth: true,
  component: UserProfile,
  parent: ADMIN_DASHBOARD_ROUTE,
});

// ------------------------------------
// Account
// ------------------------------------
export const ACCOUNT_ROUTE: Route = createRoute({
  name: "Account",
  path: "/account",
  auth: true,
  component: Account,
  icon: AccountBoxIcon,
  parent: DASHBOARD_ROUTE,
});

export const USER_ROUTES: Route[] = [ADMIN_USERS_ROUTE, ACCOUNT_ROUTE];

export default USER_ROUTES;
