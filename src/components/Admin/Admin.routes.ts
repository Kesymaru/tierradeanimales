import { Route, RouteFactory } from "@/routes";

import AdminDashboard from "@/Dashboard/components/AdminDashboard";

export const ADMIN_ROUTE: Route = RouteFactory({
  name: "Admin",
  path: "/Admin",
  auth: true,
  component: AdminDashboard,
});

const ADMIN_ROUTES: Route[] = [ADMIN_ROUTE];

export default ADMIN_ROUTES;
