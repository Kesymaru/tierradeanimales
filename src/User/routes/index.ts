import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { Route, RouteFactory } from "@app/core";
import { DASHBOARD_ROUTE } from "@app/Dashboard/routes";

import Account from "../../User/components/Account";

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
