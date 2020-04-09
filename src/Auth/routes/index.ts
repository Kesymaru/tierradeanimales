import Route from "@core/models/route";

import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";

// ------------------------------------
// Sign Up
// ------------------------------------
export const SIGN_UP_ROUTE: Route = {
  name: "Sign Up",
  path: "/signup",
  component: SignUp,
};

// ------------------------------------
// Sign In
// ------------------------------------
export const SIGN_IN_ROUTE: Route = {
  name: "Sign In",
  path: "/signin",
  component: SignIn,
};

// ------------------------------------
// Forgot Password
// ------------------------------------
export const FORGOT_PASSWORD_ROUTE: Route = {
  name: "Forgot Password",
  path: "/pw-forget",
  component: ForgotPassword,
};

export const ROUTES: Route[] = [
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  FORGOT_PASSWORD_ROUTE,
];

export default ROUTES;
