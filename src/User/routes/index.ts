import AccountBoxIcon from "@/user/routes/node_modules/@material-ui/icons/AccountBox";

import { Route, RouteFactory } from "@/user/routes/node_modules/@app/core";
import { DASHBOARD_ROUTE } from "@/user/routes/node_modules/@app/Dashboard/routes";

import Account from "../components/Account";

// ------------------------------------
// Account
// ------------------------------------
export const ACCOUNT_ROUTE: Route = RouteFactory({
  name: "Account",
  path: "/account",
  auth: true,
  component: Account,
  icon: AccountBoxIcon,
  parent: DASHBOARD_ROUTE,
});

export const ROUTES: Route[] = [ACCOUNT_ROUTE];

export default ROUTES;
