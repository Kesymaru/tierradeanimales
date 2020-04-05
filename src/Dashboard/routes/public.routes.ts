import { AppRoute, RouteFactory } from "@route";

import Dashboard from "../components/Dashboard";

const DASHBOARD_ROUTE: AppRoute = RouteFactory({
  name: "Dashboard",
  path: "/dashboard",
  exact: true,
  component: Dashboard,
});

const PUBLIC_ROUTES: AppRoute[] = [DASHBOARD_ROUTE];

export default PUBLIC_ROUTES;
