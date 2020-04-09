import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@core/models/route";
import { RouteFactory } from "@core/hooks/route";
import { DASHBOARD_ROUTE, ADMIN_DASHBOARD_ROUTE } from "@app/dashboard/routes";
import { AdminCases, EditCase, Cases, CaseDetails } from "@app/case/components";

export const ADMIN_CASE_ROUTE: Route = {
  name: "Cases",
  path: "/admin/cases",
  auth: true,
  component: AdminCases,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: PetsIcon,
};

export const ADMIN_DOG_EDIT_ROUTE: Route = {
  name: "Edit Case",
  path: `${ADMIN_CASE_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditCase,
  parent: ADMIN_CASE_ROUTE,
  icon: EditIcon,
};

export const DOG_ROUTE: Route = {
  name: "Dogs",
  path: `/dogs`,
  component: Cases,
  parent: DASHBOARD_ROUTE,
  icon: PetsIcon,
};

export const DOG_DETAILS_ROUTE: Route = {
  name: "Dog",
  path: `/dogs/:id`,
  component: CaseDetails,
  parent: DOG_ROUTE,
};

const DOGS_ROUTES: Route[] = [
  ADMIN_DOG_EDIT_ROUTE,
  ADMIN_CASE_ROUTE,

  DOG_DETAILS_ROUTE,
  DOG_ROUTE,
];

export default DOGS_ROUTES;
