import AccountBoxIcon from "@material-ui/icons/AccountBox";

import IAppRoute from "../../routes/routes.tyoes";
import {IAppRouteFactory} from "../../routes/routes.hooks";
import {DASHBOARD_ROUTE} from "../Dashboard/Dashboard.routes";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import Account from "./Account";

// ------------------------------------
// Sign Up
// ------------------------------------
export const SIGN_UP_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Sign Up',
    path: '/signup',
    component: SignUp,
});

// ------------------------------------
// Sign In
// ------------------------------------
export const SIGN_IN_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Sign In',
    path: '/signin',
    component: SignIn,
});

// ------------------------------------
// Forgot Password
// ------------------------------------
export const FORGOT_PASSWORD_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Forgot Password',
    path: '/pw-forget',
    component: ForgotPassword,
});

// ------------------------------------
// Account
// ------------------------------------
export const ACCOUNT_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Account',
    path: '/account',
    auth: true,
    component: Account,
    icon: AccountBoxIcon,
    parent: DASHBOARD_ROUTE,
});

const LOGIN_ROUTES: IAppRoute[] = [
    SIGN_UP_ROUTE,
    SIGN_IN_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    ACCOUNT_ROUTE,
];

export default LOGIN_ROUTES;
