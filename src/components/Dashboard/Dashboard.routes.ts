import IAppRoute from "../../routes/routes.tyoes";
import {IAppRouteFactory} from "../../routes/routes.hooks";

import Dashboard from "./Dashboard";

export const DASHBOARD_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Dashboard',
    path: '/',
    exact: true,
    component: Dashboard
});

const DASHBOARD_ROUTES: IAppRoute[] = [
    DASHBOARD_ROUTE,
];

export default DASHBOARD_ROUTES;
