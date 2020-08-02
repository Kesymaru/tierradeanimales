import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import DASHBOARD_ROUTE from "./dashboard";
import { Cases, EditCase } from "@screens/admin";

export const CASES_ROUTE: Route = createRoute({
  name: "Cases",
  path: `${DASHBOARD_ROUTE.path}/cases`,
  auth: true,
  admin: true,
  component: Cases,
  parent: DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const EDIT_CASE_ROUTE: Route = createRoute({
  name: "Edit Case",
  path: `${CASES_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  admin: true,
  component: EditCase,
  parent: CASES_ROUTE,
  icon: EditIcon,
});

export default CASES_ROUTE;
