import Route from "@/core/components/node_modules/@core/models/route";
import { RouteFactory } from "@/core/routes/node_modules/@core/hooks/route";

import Dashboard from "@/Dashboard/components/Dashboard";

console.log("dashboard routes");

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
