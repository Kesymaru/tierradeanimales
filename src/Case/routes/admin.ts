import PetsIcon from "@material-ui/icons/Pets";

import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";
import { ADMIN_DASHBOARD_ROUTE } from "@app/dashboard/routes";

import AdminCases from "../components/AdminCases";

export const ADMIN_CASE_ROUTE: Route = createRoute({
  name: "Cases",
  path: "/admin/cases",
  auth: true,
  component: AdminCases,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: PetsIcon,
});

const ROUTES: Array<Route> = [ADMIN_CASE_ROUTE];

export default ROUTES;
