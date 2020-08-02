import AccountBoxIcon from "@material-ui/icons/AccountBox";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import DASHBOARD_ROUTE from "./dashboard";
import Account from "@screens/Account";

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

export default ACCOUNT_ROUTE;
