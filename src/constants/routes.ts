import {ComponentClass, ComponentType, FunctionComponent} from "react";

import ListIcon from '@material-ui/icons/List';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

// ------------------------------------
// Components
// ------------------------------------
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";
import GoalsList from "../components/GoalsList";
import Account from "../components/Account";
import EditAccount from "../components/EditAccount";
import NotFound from "../components/NotFound";
import DetailsAccount from "../components/DetailsAccount";

export interface IAppRoute {
    name: string;
    path: string;
    component: FunctionComponent<any> | ComponentClass<any>;
    exact?: boolean;
    auth?: boolean;
    icon?: ComponentType<any>;
}

export interface IAppRoutes {
    [key: string]: IAppRoute;
}

// ------------------------------------
// Home
// ------------------------------------
export const HOME_ROUTE: IAppRoute = {
    name: 'Home',
    path: '/',
    exact: true,
    auth: true,
    component: GoalsList,
};

// ------------------------------------
// Sign Up
// ------------------------------------
export const SIGN_UP_ROUTE: IAppRoute = {
    name: 'Sign Up',
    path: '/signup',
    component: SignUp,
};

// ------------------------------------
// Sign In
// ------------------------------------
export const SIGN_IN_ROUTE: IAppRoute = {
    name: 'Sign In',
    path: '/signin',
    component: SignIn,
};

// ------------------------------------
// Forgot Password
// ------------------------------------
export const FORGOT_PASSWORD_ROUTE: IAppRoute = {
    name: 'Forgot Password',
    path: '/pw-forget',
    component: ForgotPassword,
};

// ------------------------------------
// Goals
// ------------------------------------
export const GOALS_ROUTE: IAppRoute = {
    name: 'Goals',
    path: '/goals',
    auth: true,
    component: GoalsList,
    icon: ListIcon,
};

// ------------------------------------
// Account
// ------------------------------------
export const ACCOUNT_ROUTE: IAppRoute = {
    name: 'Account',
    path: '/account',
    auth: true,
    component: Account,
    icon: AccountBoxIcon,
};
export const EDIT_ACCOUNT_ROUTE: IAppRoute = {
    name: 'Edit Account',
    path: `${ACCOUNT_ROUTE.path}/edit`,
    component: EditAccount
};
export const DETAILS_ACCOUNT_ROUTE: IAppRoute = {
    name: 'Details for Account',
    path: `${EDIT_ACCOUNT_ROUTE.path}/details`,
    component: DetailsAccount,
};

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: IAppRoute = {
    name: '404',
    path: '*',
    component: NotFound
};

// ------------------------------------
// Router dictionary
// ------------------------------------
const ROUTES: IAppRoutes = {
    home: HOME_ROUTE,
    signUp: SIGN_UP_ROUTE,
    signIn: SIGN_IN_ROUTE,
    forgotPassword: FORGOT_PASSWORD_ROUTE,
    goals: GOALS_ROUTE,
    detailsAccount: DETAILS_ACCOUNT_ROUTE,
    editAccount: EDIT_ACCOUNT_ROUTE,
    account: ACCOUNT_ROUTE,
    notFound: NOT_FOUND_ROUTE,
};

// ------------------------------------
// Router Array config
// ------------------------------------
export const ROUTES_ARRAY: IAppRoute[] = keys(ROUTES)
    .map(k => ROUTES[k]);

function keys<O extends object>(obj: O): Array<keyof O> {
    return Object.keys(obj) as Array<keyof O>;
}

// ------------------------------------
// Menu routes
// ------------------------------------
export const MENU_ROUTES: IAppRoute[] = [
    ACCOUNT_ROUTE,
    GOALS_ROUTE
];

export default ROUTES;
