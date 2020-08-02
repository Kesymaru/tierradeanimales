import Route from "@models/route";
import createRoute from "@utils/createRoute";
import NotFound from "@screens/NotFound";

// ------------------------------------
// 404 no match
// ------------------------------------
export const NOT_FOUND_ROUTE: Route = createRoute({
  name: "404",
  path: "*",
  component: NotFound,
});

export default NOT_FOUND_ROUTE;
