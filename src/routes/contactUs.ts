import ContactsIcon from "@material-ui/icons/Contacts";

import createRoute from "@utils/createRoute";
import Route from "@models/route";
import { AdminContacts, DetailsContact } from "@screens/contactUs";
import { ADMIN_DASHBOARD_ROUTE } from "./dashboard";

console.log("contact us component", AdminContacts);

export const ADMIN_CONTACTS_ROUTE: Route = createRoute({
  name: "Contacts Us",
  path: `${ADMIN_DASHBOARD_ROUTE.path}/contacts`,
  auth: true,
  admin: true,
  icon: ContactsIcon,
  component: AdminContacts,
  parent: ADMIN_DASHBOARD_ROUTE,
});

export const ADMIN_DETAILS_CONTACT_ROUTE: Route = createRoute({
  name: "Contats Us Details",
  path: `${ADMIN_CONTACTS_ROUTE.path}/:id`,
  defaultParams: {},
  auth: true,
  admin: true,
  component: DetailsContact,
  parent: ADMIN_CONTACTS_ROUTE,
});

export const CONTACT_ROUTES: Array<Route> = [
  ADMIN_DETAILS_CONTACT_ROUTE,
  ADMIN_CONTACTS_ROUTE,
];

export default CONTACT_ROUTES;
