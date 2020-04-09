import AccountBoxIcon from "@material-ui/icons/AccountBox";

import Route from "@core/models/route";
import { DASHBOARD_ROUTE } from "@app/dashboard/routes";

import Account from "../components/Account";

// ------------------------------------
// Account
// ------------------------------------
export const ACCOUNT_ROUTE: Route = {
  name: "Account",
  path: "/account",
  auth: true,
  component: Account,
  icon: AccountBoxIcon,
  parent: DASHBOARD_ROUTE,
};

export const ROUTES: Route[] = [ACCOUNT_ROUTE];

export default ROUTES;
