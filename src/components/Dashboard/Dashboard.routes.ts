import IAppRoute from "../../routes/routes.types";
import {IAppRouteFactory} from "../../routes/routes.hooks";

import Dashboard from "./Dashboard";

export const DASHBOARD_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    component: Dashboard
});

const DASHBOARD_ROUTES: IAppRoute[] = [
    DASHBOARD_ROUTE,
];

export default DASHBOARD_ROUTES;
