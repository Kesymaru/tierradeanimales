import IAppRoute from "../../routes/routes.types";
import { RouteFactory } from "../routes/routes.hooks";

import AdminDashboard from "./AdminDashboard";

export const ADMIN_ROUTE: IAppRoute = RouteFactory({
  name: "Admin",
  path: "/Admin",
  auth: true,
  component: AdminDashboard,
});

const ADMIN_ROUTES: IAppRoute[] = [ADMIN_ROUTE];

export default ADMIN_ROUTES;
