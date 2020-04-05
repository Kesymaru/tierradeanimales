import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

import IAppRoute from "../../routes/routes.types";
import { RouteFactory } from "../../routes/hooks";
import { DASHBOARD_ROUTE } from "../../Dashboard/routes/public.routes";
import { ADMIN_DASHBOARD } from "../../Dashboard/routes/admin.routes";

import AdminDogs from "./AdminDogs";
import EditDog from "./EditDog";
import Dogs from "./Dogs";
import DogDetails from "./DogDetails";

export const ADMIN_CASE_ROUTE: IAppRoute = RouteFactory({
  name: "Cases",
  path: "/Admin/cases",
  auth: true,
  component: AdminDogs,
  parent: ADMIN_DASHBOARD,
  icon: PetsIcon,
});

export const ADMIN_DOG_EDIT_ROUTE: IAppRoute = RouteFactory({
  name: "Edit Case",
  path: `${ADMIN_CASE_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditDog,
  parent: ADMIN_CASE_ROUTE,
  icon: EditIcon,
});

export const DOG_ROUTE: IAppRoute = RouteFactory({
  name: "Dogs",
  path: `/dogs`,
  component: Dogs,
  parent: DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const DOG_DETAILS_ROUTE: IAppRoute = RouteFactory({
  name: "Dog",
  path: `/dogs/:id`,
  component: DogDetails,
  parent: DOG_ROUTE,
});

const DOGS_ROUTES: IAppRoute[] = [
  ADMIN_DOG_EDIT_ROUTE,
  ADMIN_CASE_ROUTE,

  DOG_DETAILS_ROUTE,
  DOG_ROUTE,
];

export default DOGS_ROUTES;
