import IAppRoute from "../../routes/routes.types";
import { RouteFactory } from "../../routes/hooks";

import AdminDashboard from "../components/AdminDashboard";

const ADMIN_DASHBOARD: IAppRoute = RouteFactory({
  name: "Admin",
  path: "/admin",
  auth: true,
  component: AdminDashboard,
});

const ADMIN_ROUTES: IAppRoute[] = [ADMIN_DASHBOARD];

export default ADMIN_ROUTES;
