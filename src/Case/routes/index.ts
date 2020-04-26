import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";
import { DASHBOARD_ROUTE, ADMIN_DASHBOARD_ROUTE } from "@app/dashboard/routes";
import { AdminCases, EditCase, Cases, CaseDetails } from "@app/case/components";

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

export const CASES_ROUTE: Route = createRoute({
  name: "Cases",
  path: `/cases`,
  component: Cases,
  parent: DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const CASE_DETAILS_ROUTE: Route = createRoute({
  name: "Case Details",
  path: `/dogs/:id`,
  component: CaseDetails,
  parent: CASES_ROUTE,
});

export const CASE_ROUTES: Array<Route> = [
  ADMIN_EDIT_CASE_ROUTE,
  ADMIN_CASES_ROUTE,

  CASE_DETAILS_ROUTE,
  CASES_ROUTE,
];

export default CASE_ROUTES;
