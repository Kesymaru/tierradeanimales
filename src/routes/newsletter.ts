import Route from "@models/route";
import createRoute from "@utils/createRoute";
import { ADMIN_DASHBOARD_ROUTE } from "@routes/dashboard";
import { AdminNewsletter, Unsubscribe } from "@screens";

// ------------------------------------
// Admin newsletter
// ------------------------------------
export const ADMIN_NEWSLETTERS: Route = createRoute({
  name: "Newsletters",
  path: `${ADMIN_DASHBOARD_ROUTE.path}/newsletters`,
  component: AdminNewsletter,
  auth: true,
  admin: true,
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
