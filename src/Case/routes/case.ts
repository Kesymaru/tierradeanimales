import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@/App/models/route";
import { RouteFactory } from "@/App/hooks";
import { DASHBOARD_ROUTE, ADMIN_DASHBOARD_ROUTE } from "@/Dashboard/routes";
import { AdminCases, EditCase, Cases, CaseDetails } from "@/Case/components";

export const ADMIN_CASE_ROUTE: Route = RouteFactory({
  name: "Cases",
  path: "/admin/cases",
  auth: true,
  component: AdminCases,
  parent: ADMIN_DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const ADMIN_DOG_EDIT_ROUTE: Route = RouteFactory({
  name: "Edit Case",
  path: `${ADMIN_CASE_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditCase,
  parent: ADMIN_CASE_ROUTE,
  icon: EditIcon,
});

export const DOG_ROUTE: Route = RouteFactory({
  name: "Dogs",
  path: `/dogs`,
  component: Cases,
  parent: DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const DOG_DETAILS_ROUTE: Route = RouteFactory({
  name: "Dog",
  path: `/dogs/:id`,
  component: CaseDetails,
  parent: DOG_ROUTE,
});

const DOGS_ROUTES: Route[] = [
  ADMIN_DOG_EDIT_ROUTE,
  ADMIN_CASE_ROUTE,

  DOG_DETAILS_ROUTE,
  DOG_ROUTE,
];

export default DOGS_ROUTES;
