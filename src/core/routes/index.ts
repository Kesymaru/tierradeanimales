import { Route } from "@core/models";

import NotFound from "@core/components/NotFound";
import Home from "@app/home/components";

import { ROUTES as HOME_ROUTES } from "@app/home/routes";
import { ROUTES as AUTH_ROUTES } from "@app/auth/routes";
import { ROUTES as DASHBOARD_ROUTES } from "@app/dashboard/routes";
import { ROUTES as USER_ROUTES } from "@app/user/routes";
import { ROUTES as NEWSLETTER_ROUTES } from "@app/newsletter/routes";

// import DOGS_ROUTES from "../components/Dogs/Dogs.routes";
// import HOMES_ROUTES from "../components/Homes/Homes.routes";
// import ADMIN_ROUTES from "../components/Admin/Admin.routes";

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: Route = {
  name: "404",
  path: "*",
  component: NotFound,
};

// ------------------------------------
// Routes Array
// ------------------------------------
export const ROUTES: Route[] = [
  ...HOME_ROUTES,
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES,
  ...NEWSLETTER_ROUTES,

  // ...DOGS_ROUTES,
  // ...HOMES_ROUTES,
  // ...ADMIN_ROUTES,

  NOT_FOUND_ROUTE,
];

export default ROUTES;
