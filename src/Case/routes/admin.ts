import PetsIcon from "@/case/routes/node_modules/@material-ui/icons/Pets";

import Route from "@/case/routes/node_modules/@core/models/route";
import { RouteFactory } from "@/case/routes/node_modules/@core/hooks/route";
import { ADMIN_DASHBOARD_ROUTE } from "@/dashboard/routes";

import AdminCases from "@/case/components/AdminCases";

export const ADMIN_CASE_ROUTE: Route = RouteFactory({
  name: "Cases",
  path: "/admin/cases",
  auth: true,
  component: AdminCases,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: PetsIcon,
});
