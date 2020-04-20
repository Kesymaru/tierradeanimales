import Route from "@core/models/route";
import createRoute from "@core/utils/createRoute";
import { ADMIN_DASHBOARD_ROUTE } from "@app/dashboard/routes";
import Unsubscribe from "../screens/Unsubscribe";
import AdminNewsletter from "../screens/AdminNewsletter";

// ------------------------------------
// Admin newsletter
// ------------------------------------
export const ADMIN_NEWSLETTERS: Route = createRoute({
  name: "Newsletters",
  path: `${ADMIN_DASHBOARD_ROUTE.path}/newsletters`,
  component: AdminNewsletter,
  parent: ADMIN_DASHBOARD_ROUTE,
});

// ------------------------------------
// Unsubscribe newsletter
// ------------------------------------
export const NEWSLETTER_UNSUBSCRIBE: Route = createRoute({
  name: "Newsletter Unsubscribe",
  path: "/unsubscribe",
  component: Unsubscribe,
});

export const NEWSLETTER_ROUTES: Route[] = [
  ADMIN_NEWSLETTERS,
  NEWSLETTER_UNSUBSCRIBE,
];

export default NEWSLETTER_ROUTES;
