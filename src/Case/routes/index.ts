import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

import { Route, RouteFactory } from "@/routes";

import { ADMIN_DASHBOARD, DASHBOARD_ROUTE } from "@/Dashboard/components";

import AdminDogs from "../components/AdminDogs";
import EditDog from "../components/EditDog";
import Dogs from "../components/Dogs";
import DogDetails from "../components/DogDetails";

export const ADMIN_DOGS_ROUTE: Route = RouteFactory({
  name: "Dogs",
  path: "/Admin/dogs",
  auth: true,
  component: AdminDogs,
  parent: ADMIN_DASHBOARD,
  icon: PetsIcon,
});

export const ADMIN_DOG_EDIT_ROUTE: Route = RouteFactory({
  name: "Edit Dog",
  path: `${ADMIN_DOGS_ROUTE.path}/:id`,
  defaultParams: { id: "new" },
  auth: true,
  component: EditDog,
  parent: ADMIN_DOGS_ROUTE,
  icon: EditIcon,
});

export const DOG_ROUTE: Route = RouteFactory({
  name: "Dogs",
  path: `/dogs`,
  component: Dogs,
  parent: DASHBOARD_ROUTE,
  icon: PetsIcon,
});

export const DOG_DETAILS_ROUTE: Route = RouteFactory({
  name: "Dog",
  path: `/dogs/:id`,
  component: DogDetails,
  parent: DOG_ROUTE,
});

const CASES_ROUTES: Route[] = [
  ADMIN_DOG_EDIT_ROUTE,
  ADMIN_DOGS_ROUTE,

  DOG_DETAILS_ROUTE,
  DOG_ROUTE,
];

export default CASES_ROUTES;
