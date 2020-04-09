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

export const NEWSLETTER_ROUTES: Route[] = [NEWSLETTER_UNSUBSCRIBE];

export default NEWSLETTER_ROUTES;
