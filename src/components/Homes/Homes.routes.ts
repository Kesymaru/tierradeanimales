import HouseIcon from "@material-ui/icons/House";
import EditIcon from '@material-ui/icons/Edit';

import IAppRoute from "../../routes/routes.tyoes";
import {IAppRouteFactory} from "../../routes/routes.hooks";
import {ADMIN_ROUTE} from "../Admin/Admin.routes";

import Homes from "./Homes";
import EditHome from "./EditHome";

export const ADMIN_HOMES_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Foster Homes',
    path: '/homes',
    auth: true,
    component: Homes,
    parent: ADMIN_ROUTE,
    icon: HouseIcon,
});

export const ADMIN_HOME_EDIT_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Edit Dashboard',
    path: `${ADMIN_HOMES_ROUTE.path}/:id`,
    defaultParams: {id: 'new'},
    auth: true,
    component: EditHome,
    parent: ADMIN_HOMES_ROUTE,
    icon: EditIcon,
});

const HOMES_ROUTES: IAppRoute[] = [
    ADMIN_HOME_EDIT_ROUTE,
    ADMIN_HOMES_ROUTE
];

export default HOMES_ROUTES;
