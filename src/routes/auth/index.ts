import Route from "@models/route";
import SIGN_UP_ROUTE from "./signUp";
import SIGN_IN_ROUTE from "./signIn";
import FORGOT_PASSWORD_ROUTE from "./forgotPassword";

export const AUTH_ROUTES: Array<Route> = [
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  FORGOT_PASSWORD_ROUTE,
];

export * from "./forgotPassword";
export * from "./signIn";
export * from "./signUp";

export default AUTH_ROUTES;
