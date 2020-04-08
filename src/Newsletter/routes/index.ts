import Route from "@/App/models/route";
import { RouteFactory } from "@/App/hooks";

import { NewsletterUnsubscriber } from "@/Newsletter/components";

// ------------------------------------
// Unsubscribe newsletter
// ------------------------------------
export const NEWSLETTER_UNSUBSCRIBE: Route = RouteFactory({
  name: "Newsletter Unsubscribe",
  path: "/unsubscribe",
  component: NewsletterUnsubscriber,
});

export const ROUTES: Route[] = [NEWSLETTER_UNSUBSCRIBE];

export default ROUTES;
