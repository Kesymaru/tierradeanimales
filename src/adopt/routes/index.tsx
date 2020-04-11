import PetsIcon from "@material-ui/icons/Pets";

import Route from "@core/models/route";
import Adopt from "../screens/Adopt";

// ------------------------------------
// Home
// ------------------------------------
export const ADOPT_ROUTE: Route = {
  name: "Adopt",
  path: "/adopt",
  component: Adopt,
  icon: PetsIcon,
};

export const ADOPT_ROUTES: Array<Route> = [ADOPT_ROUTE];

export default ADOPT_ROUTES;
