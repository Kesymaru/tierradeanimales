import Route from "@models/route";
import createRoute from "@utils/createRoute";
import SignIn from "@screens/SignIn";

// ------------------------------------
// Sign In
// ------------------------------------
export const SIGN_IN_ROUTE: Route = createRoute({
  name: "Sign In",
  path: "/signin",
  component: SignIn,
});

export default SIGN_IN_ROUTE;
