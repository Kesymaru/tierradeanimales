import {ComponentClass, ComponentType, FunctionComponent} from "react";
import {generatePath} from "react-router";

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
import ChatList, {Chat} from "../components/Chat";
import CreatChat from "../components/Chat/CreatChat";
import EditVersus from "../components/versus/EditVersus";
import Versus from "../components/versus/Versus";
import VersusAdmin from "../components/versus/VersusAdmin";
import {strict} from "assert";

export interface IAppRoute {
    name: string;
    path: string;
    component: FunctionComponent<any> | ComponentClass<any>;
    exact?: boolean;
    auth?: boolean;
    icon?: ComponentType<any>;
    parent?: IAppRoute;
    getPath?: Function;
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

export const ACCOUNT_EDIT_ROUTE: IAppRoute = {
    name: 'Edit Account',
    path: `${ACCOUNT_ROUTE.path}/edit`,
    component: EditAccount
};

export const ACCOUNT_DETAILS_ROUTE: IAppRoute = {
    name: 'Details for Account',
    path: `${ACCOUNT_EDIT_ROUTE.path}/details`,
    component: DetailsAccount,
};

const ACCOUNT_ROUTES: IAppRoute[] = [
    ACCOUNT_ROUTE,
    ACCOUNT_EDIT_ROUTE,
    ACCOUNT_DETAILS_ROUTE,
];

// ------------------------------------
// Chat
// ------------------------------------
export const CHAT_LIST_ROUTE: IAppRoute = {
    name: 'Chat List',
    path: `/chat`,
    auth: true,
    component: ChatList
};

export const CHAT_EDIT_ROUTE: IAppRoute = {
    name: 'Edit Chat',
    path: `${CHAT_LIST_ROUTE.path}/new`,
    auth: true,
    component: CreatChat,
};

export const CHAT_ROUTE: IAppRoute = {
    name: 'Chat',
    path: `${CHAT_LIST_ROUTE.path}/:id`,
    auth: true,
    component: Chat
};

const CHAT_ROUTES: IAppRoute[] = [
    CHAT_LIST_ROUTE,
    CHAT_EDIT_ROUTE,
    CHAT_ROUTE
];

// ------------------------------------
// Versus
// ------------------------------------
export const VERSUS_ADMIN: IAppRoute = {
    name: 'Versus',
    path: '/admin/versus',
    auth: true,
    component: VersusAdmin,
    parent: HOME_ROUTE
};

export const VERSUS_EDIT_ADMIN_ROUTE: IAppRoute = {
    name: 'Edit Versus',
    path: '/admin/versus/:id',
    getPath: getPath('/admin/versus/:id', {id: 'new'}),
    auth: true,
    component: EditVersus,
    parent: VERSUS_ADMIN
};

interface IParam {
    [paramName: string]: string | number | boolean | undefined;
}
function getPath(path: string, defaults?: IParam ): Function {
    return (params?: IParam) => {
        params = defaults ? {...defaults, ...(params||{})} : params;
        return generatePath(path, params);
    }
}

export const VERSUS_ROUTE: IAppRoute = {
    name: 'Versus',
    path: '/versus/:id',
    auth: false,
    component: Versus
};

const VERSUS_ROUTES: IAppRoute[] = [
    VERSUS_EDIT_ADMIN_ROUTE,
    VERSUS_ADMIN,
    VERSUS_ROUTE
];

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: IAppRoute = {
    name: '404',
    path: '*',
    component: NotFound
};

// ------------------------------------
// Routes Array
// ------------------------------------
const ROUTES: IAppRoute[] = [
    HOME_ROUTE,
    SIGN_UP_ROUTE,
    SIGN_IN_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    GOALS_ROUTE,
    ...ACCOUNT_ROUTES,
    ...CHAT_ROUTES,
    ...VERSUS_ROUTES,
    NOT_FOUND_ROUTE,
];

export function find(path: string): IAppRoute|undefined {
    return ROUTES.find(route => route.path === path)
}

export function getBreadcrumbs(path: string): IAppRoute[] {
    let route = find(path);
    if(!route) return [];

    let paths = [route];
    while (route && route.parent) {
        route = route.parent;
        paths.push(route);
    }
    return paths.reverse();
}

export default ROUTES;
