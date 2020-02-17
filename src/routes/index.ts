import IAppRoute from "./routes.tyoes";

import {IAppRouteFactory} from "./routes.hooks";
import AdminDashboard from "../components/Admin/AdminDashboard";
import NotFound from "../components/NotFound";

import LOGIN_ROUTES from "../components/Login/Login.routes";
import DASHBOARD_ROUTES from "../components/Dashboard/Dashboard.routes";
import DOGS_ROUTES from "../components/Dogs/Dogs.routes";
import HOMES_ROUTES from "../components/Homes/Homes.routes";
import ADMIN_ROUTES from "../components/Admin/Admin.routes";

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: IAppRoute = IAppRouteFactory({
    name: '404',
    path: '*',
    component: NotFound
});

// ------------------------------------
// Routes Array
// ------------------------------------
const ROUTES: IAppRoute[] = [
    ...LOGIN_ROUTES,
    ...DASHBOARD_ROUTES,

    ...DOGS_ROUTES,
    ...HOMES_ROUTES,
    ...ADMIN_ROUTES,

    NOT_FOUND_ROUTE,
];

export default ROUTES;
