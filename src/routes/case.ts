import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import { AdminCases, EditCase } from "@screens/case";
// import AdminCases from "@screens/case/AdminCases";
// import EditCase from "@screens/case/EditCase";
import { ADMIN_DASHBOARD_ROUTE } from "./dashboard";

console.log("components", AdminCases, EditCase);

export const ADMIN_CASES_ROUTE: Route = createRoute({
  name: "Cases",
  path: `${ADMIN_DASHBOARD_ROUTE.path}/cases`,
  auth: true,
  admin: true,
  component: AdminCases,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const ADMIN_EDIT_CASE_ROUTE: Route = createRoute({
  name: "Edit Case",
  path: `${ADMIN_CASES_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  admin: true,
  component: EditCase,
  parent: ADMIN_CASES_ROUTE,
  icon: EditIcon,
});

export const CASE_ROUTES: Array<Route> = [
  ADMIN_EDIT_CASE_ROUTE,
  ADMIN_CASES_ROUTE,
];

export default CASE_ROUTES;
