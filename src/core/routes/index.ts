import Route from "@core/models/route";
import NotFound from "@core/components/NotFound";

import HOME_ROUTES from "@app/home/routes";
import AUTH_ROUTES from "@app/auth/routes";
import DASHBOARD_ROUTES from "@app/dashboard/routes";
import USER_ROUTES from "@app/user/routes";
import NEWSLETTER_ROUTES from "@app/newsletter/routes";

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: Route = {
  name: "404",
  path: "*",
  component: NotFound,
};

// ------------------------------------
// App Routes
// ------------------------------------
export const ROUTES: Array<Route> = [
  ...HOME_ROUTES,
  ...DASHBOARD_ROUTES,
  ...NEWSLETTER_ROUTES,
  ...USER_ROUTES,
  ...AUTH_ROUTES,

  NOT_FOUND_ROUTE,
];

export * from "@app/auth/routes";
export default ROUTES;
