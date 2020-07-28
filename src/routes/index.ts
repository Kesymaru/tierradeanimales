import Route from "@models/route";
import createRoute from "@utils/createRoute";
import NotFound from "@screens/NotFound";

import AUTH_ROUTES from "./auth";
import DASHBOARD_ROUTES from "./dashboard";
import { HOME_ROUTES, HOME_ROUTE } from "./home";
import NEWSLETTER_ROUTES from "./newsletter";
import { USER_ROUTES, ADMIN_USERS_ROUTE } from "./user";
import ADOPT_ROUTES from "./adopt";
import { FOSTER_HOME_ROUTES, FOSTER_HOMES_ROUTE } from "./fosterHome";
import { CASE_ROUTES, ADMIN_CASES_ROUTE } from "./case";
import { CONTACT_ROUTES, ADMIN_CONTACTS_ROUTE } from "./contactUs";

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
  // DASHBOARD_ROUTE,
  ADMIN_CASES_ROUTE,
  // FOSTER_HOMES_ROUTE,
  ADMIN_CONTACTS_ROUTE,
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
  ...CONTACT_ROUTES,

  NOT_FOUND_ROUTE,
];

export * from "./auth";
export * from "./case";
export * from "./contactUs";
export * from "./dashboard";
export * from "./home";
export * from "./fosterHome";
export * from "./newsletter";
export * from "./user";
export * from "./adopt";

export default ROUTES;
