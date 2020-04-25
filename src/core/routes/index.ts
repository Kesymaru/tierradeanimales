import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";
import NotFound from "@core/components/NotFound";

import AUTH_ROUTES from "@app/auth/routes";
import { DASHBOARD_ROUTES, DASHBOARD_ROUTE } from "@app/dashboard/routes";
import { HOME_ROUTES, HOME_ROUTE } from "@app/home/routes";
import NEWSLETTER_ROUTES from "@app/newsletter/routes";
import { USER_ROUTES, ADMIN_USERS_ROUTE } from "@app/user/routes";
import ADOPT_ROUTES from "@app/adopt/routes";
import { FOSTER_HOME_ROUTES, FOSTER_HOMES_ROUTE } from "@app/fosterHome/routes";
import { CASE_ROUTES, ADMIN_CASES_ROUTE } from "@app/case/routes";

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: Route = createRoute({
  name: "404",
  path: "*",
  component: NotFound,
});

// ------------------------------------
// Navbar Routes
// ------------------------------------
export const NAVBAR_ROUTES: Array<Route> = [
  ADMIN_USERS_ROUTE,
  DASHBOARD_ROUTE,
  ADMIN_CASES_ROUTE,
  FOSTER_HOMES_ROUTE,
  HOME_ROUTE,
];

// ------------------------------------
// App Routes
// ------------------------------------
export const ROUTES: Array<Route> = [
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES,
  ...HOME_ROUTES,
  ...NEWSLETTER_ROUTES,
  ...USER_ROUTES,
  ...ADOPT_ROUTES,
  ...FOSTER_HOME_ROUTES,
  ...CASE_ROUTES,

  NOT_FOUND_ROUTE,
];

export * from "@app/auth/routes";
export * from "@app/dashboard/routes";
export * from "@app/home/routes";
export * from "@app/newsletter/routes";
export * from "@app/user/routes";

export default ROUTES;
