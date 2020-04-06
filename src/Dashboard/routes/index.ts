import { Route, RouteFactory } from "@/routes";

import Dashboard from "../components/Dashboard";

export const DASHBOARD_ROUTE: Route = RouteFactory({
  name: "Dashboard",
  path: "/dashboard",
  exact: true,
  component: Dashboard,
});

export const ADMIN_DASHBOARD_ROUTE: Route = RouteFactory({
  name: "Dashboard",
  path: "/admin",
  exact: true,
  component: Dashboard,
});

export const ROUTES: Route[] = [DASHBOARD_ROUTE, ADMIN_DASHBOARD_ROUTE];
export default ROUTES;
