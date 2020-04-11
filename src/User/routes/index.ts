import AccountBoxIcon from "@material-ui/icons/AccountBox";

import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";
import { DASHBOARD_ROUTE } from "@app/dashboard/routes";

import Account from "../components/Account";

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

export const USER_ROUTES: Route[] = [ACCOUNT_ROUTE];

export default USER_ROUTES;
