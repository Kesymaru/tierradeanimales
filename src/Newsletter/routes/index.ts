import Route from "@core/models/route";

import Unsubscribe from "../screens/Unsubscribe";

// ------------------------------------
// Unsubscribe newsletter
// ------------------------------------
export const NEWSLETTER_UNSUBSCRIBE: Route = {
  name: "Newsletter Unsubscribe",
  path: "/unsubscribe",
  component: Unsubscribe,
};

export const NEWSLETTER_ROUTES: Route[] = [NEWSLETTER_UNSUBSCRIBE];

export default NEWSLETTER_ROUTES;
