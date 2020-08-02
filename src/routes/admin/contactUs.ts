import ContactsIcon from "@material-ui/icons/Contacts";

import createRoute from "@utils/createRoute";
import Route from "@models/route";
import DASHBOARD_ROUTE from "./dashboard";
import { ContactUs, DetailsContactUs } from "@screens/admin";

export const CONTACTUS_ROUTE: Route = createRoute({
  name: "Contacts Us",
  path: `${DASHBOARD_ROUTE.path}/contacts`,
  auth: true,
  admin: true,
  icon: ContactsIcon,
  component: ContactUs,
  parent: DASHBOARD_ROUTE,
});

export const DETAILS_CONTACTUS_ROUTE: Route = createRoute({
  name: "Contats Us Details",
  path: `${CONTACTUS_ROUTE.path}/:id`,
  defaultParams: {},
  auth: true,
  admin: true,
  component: DetailsContactUs,
  parent: CONTACTUS_ROUTE,
});

export default CONTACTUS_ROUTE;
