import HomeIcon from "@material-ui/icons/Home";

import Route from "@models/route";
import createRoute from "@utils/createRoute";
import Home from "@screens/Home";

// ------------------------------------
// Home
// ------------------------------------
export const HOME_ROUTE: Route = createRoute({
  name: "Home",
  path: "/",
  exact: true,
  component: Home,
  icon: HomeIcon,
});

export default HOME_ROUTE;
