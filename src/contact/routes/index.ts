import ContactsIcon from "@material-ui/icons/Contacts";

import createRoute from "@core/utils/createRoute";
import Route from "@core/models/route";

import { ADMIN_DASHBOARD_ROUTE } from "@app/dashboard";
import AdminContacts from "../screens/AdminContacts";

export const ADMIN_CONTACTS_ROUTE: Route = createRoute({
  name: "Contacts",
  path: `${ADMIN_DASHBOARD_ROUTE.path}/contacts`,
  auth: true,
  admin: true,
  icon: ContactsIcon,
  component: AdminContacts,
  parent: ADMIN_DASHBOARD_ROUTE,
});

export const CONTACT_ROUTES: Array<Route> = [ADMIN_CONTACTS_ROUTE];

export default CONTACT_ROUTES;
