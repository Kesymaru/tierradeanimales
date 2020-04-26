import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";

import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import ForgotPassword from "../screens/ForgotPassword";

// ------------------------------------
// Sign Up
// ------------------------------------
export const SIGN_UP_ROUTE: Route = createRoute({
  name: "Sign Up",
  path: "/signup",
  component: SignUp,
});

// ------------------------------------
// Sign In
// ------------------------------------
export const SIGN_IN_ROUTE: Route = createRoute({
  name: "Sign In",
  path: "/signin",
  component: SignIn,
});

// ------------------------------------
// Forgot Password
// ------------------------------------
export const FORGOT_PASSWORD_ROUTE: Route = createRoute({
  name: "Forgot Password",
  path: "/pw-forget",
  component: ForgotPassword,
});

export const AUTH_ROUTES: Array<Route> = [
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  FORGOT_PASSWORD_ROUTE,
];

export default AUTH_ROUTES;
