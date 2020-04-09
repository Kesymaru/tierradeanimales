import Route from "@core/models/route";

import Dashboard from "../components/Dashboard";

export const DASHBOARD_ROUTE: Route = {
  name: "Dashboard",
  path: "/dashboard",
  exact: true,
  component: Dashboard,
};

export const ADMIN_DASHBOARD_ROUTE: Route = {
  name: "Dashboard",
  path: "/admin",
  exact: true,
  component: Dashboard,
};

export const DASHBOARD_ROUTES: Route[] = [
  DASHBOARD_ROUTE,
  ADMIN_DASHBOARD_ROUTE,
];

export default DASHBOARD_ROUTES;
