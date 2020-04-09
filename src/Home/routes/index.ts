import Route from "@core/models/route";
import Home from "../components/Home";

// ------------------------------------
// Home
// ------------------------------------
export const HOME_ROUTE: Route = {
  name: "Home",
  path: "/",
  exact: true,
  component: Home,
};

export const HOME_ROUTES: Route[] = [HOME_ROUTE];

export default HOME_ROUTES;
