import { Routes } from "@models/route";

import { ADMIN_ROUTES, CONTACTUS_ROUTE, FOSTER_HOMES_ROUTE } from "./admin";
import AUTH_ROUTES from "./auth";
import HOME_ROUTE from "./home";
import NEWSLETTER_UNSUBSCRIBE from "./newsletter";
import NOT_FOUND_ROUTE from "./notFound";
import ACCOUNT_ROUTE from "./user";
import { ADOPT_ROUTE, DETAILS_ADOPT_ROUTE } from "./adopt";

// ------------------------------------
// Navbar Routes
// ------------------------------------
export const NAVBAR_ROUTES: Routes = [
  FOSTER_HOMES_ROUTE,
  CONTACTUS_ROUTE,
  HOME_ROUTE,
];

// ------------------------------------
// App Routes
// ------------------------------------
export const ROUTES: Routes = [
  ...ADMIN_ROUTES,
  ...AUTH_ROUTES,

  ACCOUNT_ROUTE,

  DETAILS_ADOPT_ROUTE,
  ADOPT_ROUTE,

  NEWSLETTER_UNSUBSCRIBE,

  HOME_ROUTE,

  NOT_FOUND_ROUTE,
];

export * from "./admin";
export * from "./auth";

export * from "./dashboard";
export * from "./home";
export * from "./newsletter";
export * from "./notFound";
export * from "./user";
export * from "./adopt";

export default ROUTES;
