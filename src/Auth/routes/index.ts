import AccountBoxIcon from "@material-ui/icons/AccountBox";

import Route from "@core/models/route";
import { RouteFactory } from "@core/hooks/route";
import { DASHBOARD_ROUTE } from "@/Dashboard/routes";

import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";
import Account from "../../User/components/Account";

// ------------------------------------
// Sign Up
// ------------------------------------
export const SIGN_UP_ROUTE: Route = RouteFactory({
  name: "Sign Up",
  path: "/signup",
  component: SignUp,
});

// ------------------------------------
// Sign In
// ------------------------------------
export const SIGN_IN_ROUTE: Route = RouteFactory({
  name: "Sign In",
  path: "/signin",
  component: SignIn,
});

// ------------------------------------
// Forgot Password
// ------------------------------------
export const FORGOT_PASSWORD_ROUTE: Route = RouteFactory({
  name: "Forgot Password",
  path: "/pw-forget",
  component: ForgotPassword,
});

// ------------------------------------
// Account
// ------------------------------------
console.log("account before factory");

export const ACCOUNT_ROUTE_TEST: Route = RouteFactory({
  name: "Account",
  path: "/account",
  auth: true,
  component: Account,
  icon: AccountBoxIcon,
  parent: DASHBOARD_ROUTE,
});

console.log("account route", ACCOUNT_ROUTE_TEST);

export const ROUTES: Route[] = [
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  ACCOUNT_ROUTE_TEST,
];

export default ROUTES;
