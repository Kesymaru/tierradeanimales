import IAppRoute from "../../routes/routes.tyoes";
import {IAppRouteFactory} from "../../routes/routes.hooks";

import AdminDashboard from "./AdminDashboard";

export const ADMIN_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Admin',
    path: '/Admin',
    auth: true,
    component: AdminDashboard
});

const ADMIN_ROUTES: IAppRoute[] = [
    ADMIN_ROUTE
];

export default ADMIN_ROUTES;
