import PetsIcon from "@material-ui/icons/Pets";

import Route from "@core/models/route";
import { ADMIN_DASHBOARD_ROUTE } from "@app/dashboard/routes";

import AdminCases from "../components/AdminCases";

export const ADMIN_CASE_ROUTE: Route = {
  name: "Cases",
  path: "/admin/cases",
  auth: true,
  component: AdminCases,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: PetsIcon,
};
