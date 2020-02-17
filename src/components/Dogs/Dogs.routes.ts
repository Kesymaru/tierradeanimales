import PetsIcon from '@material-ui/icons/Pets';
import EditIcon from '@material-ui/icons/Edit';

import IAppRoute from "../../routes/routes.tyoes";
import {IAppRouteFactory} from "../../routes/routes.hooks";
import {DASHBOARD_ROUTE} from "../Dashboard/Dashboard.routes";
import {ADMIN_ROUTE} from "../Admin/Admin.routes";

import AdminDogs from "./AdminDogs";
import EditDog from "./EditDog";
import Dogs from "./Dogs";
import DogDetails from "./DogDetails";

export const ADMIN_DOGS_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Dogs',
    path: '/Admin/dogs',
    auth: true,
    component: AdminDogs,
    parent: ADMIN_ROUTE,
    icon: PetsIcon,
});

export const ADMIN_DOG_EDIT_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Edit Dog',
    path: `${ADMIN_DOGS_ROUTE.path}/:id`,
    defaultParams: {id: 'new'},
    auth: true,
    component: EditDog,
    parent: ADMIN_DOGS_ROUTE,
    icon: EditIcon,
});

export const DOG_ROUTE: IAppRoute = IAppRouteFactory({
    name: 'Dogs',
    path: `/dogs`,
    component: Dogs,
    parent: DASHBOARD_ROUTE,
    icon: PetsIcon,
});

export const DOG_DETAILS_ROUTE: IAppRoute = IAppRouteFactory({
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

export default DOGS_ROUTES;
