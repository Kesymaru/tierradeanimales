import PetsIcon from "@material-ui/icons/Pets";

import Route from "@core/models/route";
import { RouteFactory } from "@core/hooks/route";
import { ADMIN_DASHBOARD_ROUTE } from "@/Dashboard/routes";

import AdminCases from "@/Case/components/AdminCases";

export const ADMIN_CASE_ROUTE: Route = RouteFactory({
  name: "Cases",
  path: "/admin/cases",
  auth: true,
  component: AdminCases,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: PetsIcon,
});
