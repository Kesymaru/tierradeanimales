import Route from "@models/route";
import createRoute from "@utils/createRoute";
import Unsubscribe from "@screens/Unsubscribe";

// ------------------------------------
// Unsubscribe newsletter
// ------------------------------------
export const NEWSLETTER_UNSUBSCRIBE: Route = createRoute({
  name: "Newsletter Unsubscribe",
  path: "/unsubscribe",
  component: Unsubscribe,
});

export default NEWSLETTER_UNSUBSCRIBE;
