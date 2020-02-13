import {ComponentClass, ComponentType, FunctionComponent} from "react";
import {generatePath, matchPath} from "react-router";
import * as H from 'history';
import {useLocation} from "react-router-dom";

import AccountBoxIcon from '@material-ui/icons/AccountBox';

// ------------------------------------
//  Public Components
// ------------------------------------
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";
import Account from "../components/Account";
import NotFound from "../components/NotFound";
import Dogs from "../components/Dogs/Dogs";

// ------------------------------------
//  Admin Components
// ------------------------------------
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminDogs from "../components/Dogs/AdminDogs";
import EditDog from "../components/Dogs/EditDog";
import DogDetails from "../components/Dogs/DogDetails";

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
    component: AdminDashboard
});

export const ADMIN_ROUTE: IAppRoute = factory({
    name: 'Admin',
    path: '/admin',
    auth: true,
    component: AdminDashboard
})

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
// Account
// ------------------------------------
export const ACCOUNT_ROUTE: IAppRoute = factory({
    name: 'Account',
    path: '/account',
    auth: true,
    component: Account,
    icon: AccountBoxIcon,
    parent: HOME_ROUTE,
});

const ACCOUNT_ROUTES: IAppRoute[] = [
    ACCOUNT_ROUTE,
];

// ------------------------------------
// Dogs
// ------------------------------------
export const ADMIN_DOGS_ROUTE: IAppRoute = factory({
    name: 'Dogs',
    path: '/admin/dogs',
    auth: true,
    component: AdminDogs,
    parent: ADMIN_ROUTE
});

export const ADMIN_DOG_EDIT_ROUTE: IAppRoute = factory({
    name: 'Edit Dog',
    path: `${ADMIN_DOGS_ROUTE.path}/:id`,
    defaultParams: {id: 'new'},
    auth: true,
    component: EditDog,
    parent: ADMIN_DOGS_ROUTE
});

export const DOG_ROUTE: IAppRoute = factory({
    name: 'Dogs',
    path: `/dogs`,
    component: Dogs,
    parent: HOME_ROUTE
});

export const DOG_DETAILS_ROUTE: IAppRoute = factory({
    name: 'Dog',
    path: `/dogs/:id`,
    component: DogDetails,
    parent: DOG_ROUTE
});

const DOGS_ROUTES: IAppRoute[] = [
    ADMIN_DOG_EDIT_ROUTE,
    ADMIN_DOGS_ROUTE,

    DOG_DETAILS_ROUTE,
    DOG_ROUTE
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
    SIGN_UP_ROUTE,
    SIGN_IN_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    ...ACCOUNT_ROUTES,
    ...DOGS_ROUTES,
    ADMIN_ROUTE,
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
