import { Routes } from "@models/route";

import { CASES_ROUTE, EDIT_CASE_ROUTE } from "./cases";
import { DETAILS_CONTACTUS_ROUTE, CONTACTUS_ROUTE } from "./contactUs";
import { FOSTER_HOMES_ROUTE, EDIT_FOSTER_HOME_ROUTE } from "./fosterHome";
import DASHBOARD_ROUTE from "./dashboard";
import NEWSLETTERS from "./newsletter";
import USERS_ROUTE from "./users";

export const ADMIN_ROUTES: Routes = [
  EDIT_CASE_ROUTE,
  CASES_ROUTE,

  DETAILS_CONTACTUS_ROUTE,
  CONTACTUS_ROUTE,

  EDIT_FOSTER_HOME_ROUTE,
  FOSTER_HOMES_ROUTE,

  NEWSLETTERS,
  USERS_ROUTE,

  DASHBOARD_ROUTE,
];

export * from "./cases";
export * from "./contactUs";
export { default as ADMIN_DASHBOARD_ROUTE } from "./dashboard";
export * from "./fosterHome";
export * from "./users";

export default ADMIN_ROUTES;
