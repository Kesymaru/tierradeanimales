import DashboardIcon from "@material-ui/icons/Dashboard";

import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";
import Dashboard from "../components/Dashboard";

export const DASHBOARD_ROUTE: Route = createRoute({
  name: "Dashboard",
  path: "/dashboard",
  auth: true,
  exact: true,
  component: Dashboard,
  icon: DashboardIcon,
});

export const ADMIN_DASHBOARD_ROUTE: Route = createRoute({
  name: "Dashboard",
  path: "/admin",
  exact: true,
  component: Dashboard,
});

export const DASHBOARD_ROUTES: Route[] = [
  DASHBOARD_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
];

export default DASHBOARD_ROUTES;
