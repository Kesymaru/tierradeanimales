import HomeIcon from "@material-ui/icons/Home";

import Route from "@core/models/route";
import Home from "../screens/Home";

// ------------------------------------
// Home
// ------------------------------------
export const HOME_ROUTE: Route = {
  name: "Home",
  path: "/",
  exact: true,
  component: Home,
  icon: HomeIcon,
};

export const HOME_ROUTES: Route[] = [HOME_ROUTE];

export default HOME_ROUTES;
