import { AppRoute, RouteFactory } from "@/routes";

import Dashboard from "../components/Dashboard";

export const DASHBOARD_ROUTE: AppRoute = RouteFactory({
  name: "Dashboard",
  path: "/dashboard",
  exact: true,
  component: Dashboard,
});

export const ROUTES: Route[] = [DASHBOARD_ROUTE];

export default ROUTES;
