import ContactsIcon from "@material-ui/icons/Contacts";

import createRoute from "@core/utils/createRoute";
import Route from "@core/models/route";

import { ADMIN_DASHBOARD_ROUTE } from "@app/dashboard";
import { AdminContacts, DetailsContact } from "../screens";

export const ADMIN_CONTACTS_ROUTE: Route = createRoute({
  name: "Contacts",
  path: `${ADMIN_DASHBOARD_ROUTE.path}/contacts`,
  auth: true,
  admin: true,
  icon: ContactsIcon,
  component: AdminContacts,
  parent: ADMIN_DASHBOARD_ROUTE,
});

export const ADMIN_DETAILS_CONTACT_ROUTE: Route = createRoute({
  name: "Contats Details",
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
