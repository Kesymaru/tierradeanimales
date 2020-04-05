import PetsIcon from "@material-ui/icons/Pets";

import { AppRoute, RouteFactory } from "@routes";
import { ADMIN_DASHBOARD } from "../../Dashboard/routes/admin.routes";

import AdminDogs from "./AdminDogs";

export const ADMIN_CASE_ROUTE: AppRoute = RouteFactory({
  name: "Cases",
  path: "/admin/cases",
  auth: true,
  component: AdminDogs,
  parent: ADMIN_DASHBOARD,
  icon: PetsIcon,
});
