import Route from "@models/route";
import createRoute from "@utils/createRoute";
import DASHBOARD_ROUTE from "./dashboard";
import Newsletter from "@screens/admin/Newsletter";

// ------------------------------------
// Admin newsletter
// ------------------------------------
export const NEWSLETTERS: Route = createRoute({
  name: "Newsletters",
  path: `${DASHBOARD_ROUTE.path}/newsletters`,
  component: Newsletter,
  auth: true,
  admin: true,
  parent: DASHBOARD_ROUTE,
});

export default NEWSLETTERS;
