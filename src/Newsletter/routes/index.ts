import Route from "@/newsletter/routes/node_modules/@/core/components/node_modules/@core/models/route";
import { RouteFactory } from "@/newsletter/routes/node_modules/@/core/routes/node_modules/@core/hooks/route";

import { NewsletterUnsubscriber } from "@/newsletter/components";

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
