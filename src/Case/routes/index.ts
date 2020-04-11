import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";
import { DASHBOARD_ROUTE } from "@app/dashboard/routes";

import AdminCase from "../components/AdminCases";
import EditCase from "../components/EditCase";
import Cases from "../components/Cases";
import CaseDetails from "../components/CaseDetails";

export const ADMIN_CASE_ROUTE: Route = createRoute({
  name: "Dogs",
  path: "/admin/dogs",
  auth: true,
  component: AdminCase,
  parent: DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const ADMIN_CASE_EDIT_ROUTE: Route = createRoute({
  name: "Edit Dog",
  path: `${ADMIN_CASE_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditCase,
  parent: ADMIN_CASE_ROUTE,
  icon: EditIcon,
});

export const DOG_ROUTE: Route = createRoute({
  name: "Dogs",
  path: `/dogs`,
  component: Cases,
  parent: DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const DOG_DETAILS_ROUTE: Route = createRoute({
  name: "Dog",
  path: `/dogs/:id`,
  component: CaseDetails,
  parent: DOG_ROUTE,
});

const CASES_ROUTES: Route[] = [
  ADMIN_CASE_EDIT_ROUTE,
  ADMIN_CASE_ROUTE,

  DOG_DETAILS_ROUTE,
  DOG_ROUTE,
];

export default CASES_ROUTES;
