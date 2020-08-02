import DashboardIcon from "@material-ui/icons/Dashboard";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import Dashboard from "@screens/Dashboard";

export const DASHBOARD_ROUTE: Route = createRoute({
  name: "Dashboard",
  path: "/admin",
  auth: true,
  admin: true,
  exact: true,
  component: Dashboard,
  icon: DashboardIcon,
});

export default DASHBOARD_ROUTE;
