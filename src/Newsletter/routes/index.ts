import { Route, RouteFactory } from "@/routes";

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