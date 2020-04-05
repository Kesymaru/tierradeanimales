import AccountBoxIcon from "@material-ui/icons/AccountBox";

import { Route } from "@/App";
// import IAppRoute from "../../routes/routes.types";

import { RouteFactory } from "../../routes/hooks";
import { DASHBOARD_ROUTE } from "../../Dashboard/routes/public.routes";

import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";
import Account from "../../User/components/Account";

// ------------------------------------
// Sign Up
// ------------------------------------
export const SIGN_UP_ROUTE: IAppRoute = RouteFactory({
  name: "Sign Up",
  path: "/signup",
  component: SignUp,
});

// ------------------------------------
// Sign In
// ------------------------------------
export const SIGN_IN_ROUTE: IAppRoute = RouteFactory({
  name: "Sign In",
  path: "/signin",
  component: SignIn,
});

// ------------------------------------
// Forgot Password
// ------------------------------------
export const FORGOT_PASSWORD_ROUTE: IAppRoute = RouteFactory({
  name: "Forgot Password",
  path: "/pw-forget",
  component: ForgotPassword,
});

// ------------------------------------
// Account
// ------------------------------------
export const ACCOUNT_ROUTE: IAppRoute = RouteFactory({
  name: "Account",
  path: "/account",
  auth: true,
  component: Account,
  icon: AccountBoxIcon,
  parent: DASHBOARD_ROUTE,
});

const Routes: AppRoute[] = [
  SIGN_UP_ROUTE,
  SIGN_IN_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  ACCOUNT_ROUTE,
];

export default Routes;
