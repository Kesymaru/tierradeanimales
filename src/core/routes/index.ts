import Route from "@core/models/route";
import NotFound from "@core/components/NotFound";

import AUTH_ROUTES from "@app/auth/routes";
import { DASHBOARD_ROUTES, DASHBOARD_ROUTE } from "@app/dashboard/routes";
import { HOME_ROUTES, HOME_ROUTE } from "@app/home/routes";
import NEWSLETTER_ROUTES from "@app/newsletter/routes";
import { USER_ROUTES, ACCOUNT_ROUTE } from "@app/user/routes";
import ADOPT_ROUTES from "@app/adopt/routes";

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: Route = {
  name: "404",
  path: "*",
  component: NotFound,
};

// ------------------------------------
// Navbar Routes
// ------------------------------------
export const NAVBAR_ROUTES: Array<Route> = [
  ACCOUNT_ROUTE,
  DASHBOARD_ROUTE,
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

  NOT_FOUND_ROUTE,
];

export * from "@app/auth/routes";
export * from "@app/dashboard/routes";
export * from "@app/home/routes";
export * from "@app/newsletter/routes";
export * from "@app/user/routes";

export default ROUTES;
