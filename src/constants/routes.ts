import {ComponentClass, ComponentType, FunctionComponent} from "react";
import {generatePath, matchPath} from "react-router";
import * as H from 'history';

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
import {useLocation} from "react-router-dom";
import Students from "../components/Students/Students";
import EditStudent from "../components/Students/EditStudent";
import Dogs from "../components/Dogs/Dogs";

export interface IAppRoute {
    name: string;
    path: string;
    getPath: Function;
    exact: boolean;
    auth: boolean;
    component: FunctionComponent<any> | ComponentClass<any>;

    icon?: ComponentType<any>;
    parent?: IAppRoute;
    defaultParams?: IParam;
}

interface IAppRouteFactory extends Omit<IAppRoute, 'getPath' | 'exact' | 'auth'> {
    exact?: boolean;
    auth?: boolean;
}

interface IAppRouteDefaults extends Pick<IAppRoute, 'exact' | 'auth'> {
}

const DEFAULTS: IAppRouteDefaults = {auth: false, exact: false};

export function factory(
    params: IAppRouteFactory,
    defaults: IAppRouteDefaults = DEFAULTS): IAppRoute {
    let _getPath = getPath(params.path, params.defaultParams || {});

    return {
        ...defaults,
        ...params,
        getPath: _getPath,
    } as IAppRoute;
}

// ------------------------------------
// Home
// ------------------------------------
export const HOME_ROUTE: IAppRoute = factory({
    name: 'Home',
    path: '/',
    exact: true,
    component: GoalsList,
});

// ------------------------------------
// Sign Up
// ------------------------------------
export const SIGN_UP_ROUTE: IAppRoute = factory({
    name: 'Sign Up',
    path: '/signup',
    component: SignUp,
});

// ------------------------------------
// Sign In
// ------------------------------------
export const SIGN_IN_ROUTE: IAppRoute = factory({
    name: 'Sign In',
    path: '/signin',
    component: SignIn,
});

// ------------------------------------
// Forgot Password
// ------------------------------------
export const FORGOT_PASSWORD_ROUTE: IAppRoute = factory({
    name: 'Forgot Password',
    path: '/pw-forget',
    component: ForgotPassword,
});

// ------------------------------------
// Goals
// ------------------------------------
export const GOALS_ROUTE: IAppRoute = factory({
    name: 'Goals',
    path: '/goals',
    auth: true,
    component: GoalsList,
    icon: ListIcon,
});

// ------------------------------------
// Account
// ------------------------------------
export const ACCOUNT_ROUTE: IAppRoute = factory({
    name: 'Account',
    path: '/account',
    auth: true,
    component: Account,
    icon: AccountBoxIcon,
});

export const ACCOUNT_EDIT_ROUTE: IAppRoute = factory({
    name: 'Edit Account',
    path: `${ACCOUNT_ROUTE.path}/edit`,
    component: EditAccount,
    parent: ACCOUNT_ROUTE
});

export const ACCOUNT_DETAILS_ROUTE: IAppRoute = factory({
    name: 'Details for Account',
    path: `${ACCOUNT_EDIT_ROUTE.path}/details`,
    component: DetailsAccount,
    parent: ACCOUNT_EDIT_ROUTE
});

const ACCOUNT_ROUTES: IAppRoute[] = [
    ACCOUNT_ROUTE,
    ACCOUNT_EDIT_ROUTE,
    ACCOUNT_DETAILS_ROUTE,
];

// ------------------------------------
// Chat
// ------------------------------------
export const CHAT_LIST_ROUTE: IAppRoute = factory({
    name: 'Chat List',
    path: `/chat`,
    auth: true,
    component: ChatList
});

export const CHAT_EDIT_ROUTE: IAppRoute = factory({
    name: 'Edit Chat',
    path: `${CHAT_LIST_ROUTE.path}/new`,
    auth: true,
    component: CreatChat,
});

export const CHAT_ROUTE: IAppRoute = factory({
    name: 'Chat',
    path: `${CHAT_LIST_ROUTE.path}/:id`,
    auth: true,
    component: Chat
});

const CHAT_ROUTES: IAppRoute[] = [
    CHAT_LIST_ROUTE,
    CHAT_EDIT_ROUTE,
    CHAT_ROUTE
];

// ------------------------------------
// Dogs
// ------------------------------------
const DOGS_ROUTE: IAppRoute = factory({
    name: 'Dogs',
    path: '/admin/dogs',
    auth: true,
    component: Dogs
})

// ------------------------------------
// Versus
// ------------------------------------
export const VERSUS_ADMIN: IAppRoute = factory({
    name: 'Versus',
    path: '/admin/versus',
    auth: true,
    component: VersusAdmin,
    parent: HOME_ROUTE
});

export const VERSUS_EDIT_ADMIN_ROUTE: IAppRoute = factory({
    name: 'Edit Versus',
    path: '/admin/versus/:id',
    defaultParams: {id: 'new'},
    auth: true,
    component: EditVersus,
    parent: VERSUS_ADMIN
});

export const VERSUS_ROUTE: IAppRoute = factory({
    name: 'Versus',
    path: '/versus/:id',
    defaultParams: {id: ''},
    component: Versus
});

const VERSUS_ROUTES: IAppRoute[] = [
    VERSUS_EDIT_ADMIN_ROUTE,
    VERSUS_ADMIN,
    VERSUS_ROUTE
];

// ------------------------------------
// Students
// ------------------------------------
export const STUDENTS_ROUTE: IAppRoute = factory({
    name: 'Students',
    path: '/admin/students',
    auth: true,
    component: Students,
    parent: HOME_ROUTE
});

export const STUDENTS_EDIT_ROUTE: IAppRoute = factory({
    name: 'Edit Student',
    path: '/admin/students/:id',
    defaultParams: {id: 'new'},
    auth: true,
    component: EditStudent,
    parent: STUDENTS_ROUTE
});

const STUDENTS_ROUTES: IAppRoute[] = [
    STUDENTS_EDIT_ROUTE,
    STUDENTS_ROUTE
];

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: IAppRoute = factory({
    name: '404',
    path: '*',
    component: NotFound
});

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
    ...STUDENTS_ROUTES,
    DOGS_ROUTE,
    NOT_FOUND_ROUTE,
];

// ------------------------------------
// Functions
// ------------------------------------

interface IParam {
    [paramName: string]: string | number | boolean | undefined;
}
function getPath(path: string, defaults?: IParam): Function {
    return (params?: IParam) => {
        params = defaults ? {...defaults, ...(params||{})} : params;
        return generatePath(path, params);
    }
}

export function findRoute(location: H.Location|string): IAppRoute|undefined {
    let pathname = typeof location === 'string' ? location : location.pathname;
    return ROUTES.find(route => matchPath(pathname, {
        path: route.path,
        exact: typeof route.exact === 'boolean' ? route.exact : false,
    }));
}

/**
 * Hook to get the current route paths in an array
 */
export function useRoutes(): IAppRoute[] {
    const location = useLocation();
    const routes: IAppRoute[] = [];
    let route = findRoute(location);

    if(route){
        routes.push(route);
        while (route && route.parent) {
            route = route.parent;
            routes.push(route);
        }
    }
    return routes.reverse();
}

/**
 * Hook to get the current matched route
 */
export function useRoute(): IAppRoute|undefined {
    const location = useLocation();
    return findRoute(location);
}

export default ROUTES;
