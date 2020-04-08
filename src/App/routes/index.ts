import { Route } from "@core/models";
import { RouteFactory } from "@core/hooks/route";

import NotFound from "@/App/components/NotFound";
import Home from "@/Home/components";

import { ROUTES as AUTH_ROUTES } from "@/Auth/routes";
import { ROUTES as DASHBOARD_ROUTES } from "@/Dashboard/routes";
import { ROUTES as NEWSLETTER_ROUTES } from "@/Newsletter/routes";

// import DOGS_ROUTES from "../components/Dogs/Dogs.routes";
// import HOMES_ROUTES from "../components/Homes/Homes.routes";
// import ADMIN_ROUTES from "../components/Admin/Admin.routes";

// ------------------------------------
// 404 no match
// ------------------------------------
export const HOME_ROUTE: Route = RouteFactory({
  name: "Home",
  path: "/",
  exact: true,
  component: Home,
});

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: Route = RouteFactory({
  name: "404",
  path: "*",
  component: NotFound,
});

// ------------------------------------
// Navbar Routes
// ------------------------------------
/* export const NAVBAR_ROUTES: Route[] = [
  ACCOUNT_ROUTE,
  ADMIN_CASE_ROUTE,
  FOSTER_HOMES_ROUTE,
]; */

// ------------------------------------
// Routes Array
// ------------------------------------
export const ROUTES: Route[] = [
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES,
  ...NEWSLETTER_ROUTES,

  // ...DOGS_ROUTES,
  // ...HOMES_ROUTES,
  // ...ADMIN_ROUTES,

  HOME_ROUTE,
  NOT_FOUND_ROUTE,
];

export default ROUTES;
