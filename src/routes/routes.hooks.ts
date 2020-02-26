import {generatePath, matchPath} from "react-router";
import * as H from 'history';
import {useLocation, useParams} from "react-router-dom";

import IAppRoute, {IAppRouteDefaults, IAppRouteFactoryParams, IParam} from "./routes.types";
import ROUTES from "./index";

// ------------------------------------
// Functions
// ------------------------------------
export function IAppRouteFactory(
    params: IAppRouteFactoryParams,
    defaults: IAppRouteDefaults = {auth: false, exact: false}): IAppRoute {
    let _getPath = getPath(params.path, params.defaultParams || {});

    return {
        ...defaults,
        ...params,
        getPath: _getPath,
    } as IAppRoute;
}

function getPath(path: string, defaults?: IParam): Function {
    return (params?: IParam) => {
        params = defaults ? {...defaults, ...(params || {})} : params;
        return generatePath(path, params);
    }
}

export function findRoute(location: H.Location | string): IAppRoute | undefined {
    let pathname = typeof location === 'string' ? location : location.pathname;
    return ROUTES.find(route => matchPath(pathname, {
        path: route.path,
        exact: typeof route.exact === 'boolean' ? route.exact : false,
    }));
}

// ------------------------------------
// Custom Hooks
// ------------------------------------

export function useId(field: string = 'id'): { isNew: boolean, id: string | undefined } {
    const params = useParams() as any;
    const id = params[field];
    const isNew = id && id.toLowerCase() === 'new';

    return {isNew, id}
}

/**
 * Hook to get the current matched route
 */
export function useRoute(): IAppRoute | undefined {
    const location = useLocation();
    return findRoute(location);
}

/**
 * Hook to get the current route paths in an array
 */
function useRoutes(): IAppRoute[] {
    const location = useLocation();
    const routes: IAppRoute[] = [];
    let route = findRoute(location);

    if (route) {
        routes.push(route);
        while (route && route.parent) {
            route = route.parent;
            routes.push(route);
        }
    }
    return routes.reverse();
}

export default useRoutes;
