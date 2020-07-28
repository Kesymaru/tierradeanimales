import Route from "@models/route";
import createRoute from "@utils/createRoute";
import SignUp from "@screens/auth/SignUp";

// ------------------------------------
// Sign Up
// ------------------------------------
export const SIGN_UP_ROUTE: Route = createRoute({
  name: "Sign Up",
  path: "/signup",
  component: SignUp,
});

export default SIGN_UP_ROUTE;
