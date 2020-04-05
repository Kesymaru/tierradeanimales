import { Route, RouteFactory } from "@/routes";

import NotFound from "../components/NotFound";
import HomePage from "@/HomePage/components/Home";

import { ROUTES as AUTH_ROUTES } from "@/Auth/routes";
import { ROUTES as DASHBOARD_ROUTES } from "@/Dashboard/routes";

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
  component: HomePage,
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
// Routes Array
// ------------------------------------
export const ROUTES: Route[] = [
  ...AUTH_ROUTES,
  ...DASHBOARD_ROUTES,

  // ...DOGS_ROUTES,
  // ...HOMES_ROUTES,
  // ...ADMIN_ROUTES,

  HOME_ROUTE,
  NOT_FOUND_ROUTE,
];
