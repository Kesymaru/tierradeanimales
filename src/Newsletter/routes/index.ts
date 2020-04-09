import Route from "@core/models/route";

import NewsletterUnsubscriber from "../components/NewsletterUnsubscriber";

// ------------------------------------
// Unsubscribe newsletter
// ------------------------------------
export const NEWSLETTER_UNSUBSCRIBE: Route = {
  name: "Newsletter Unsubscribe",
  path: "/unsubscribe",
  component: NewsletterUnsubscriber,
};

export const ROUTES: Route[] = [NEWSLETTER_UNSUBSCRIBE];

export default ROUTES;
