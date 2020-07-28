import Route from "@models/route";
import createRoute from "@utils/createRoute";
import ForgotPassword from "@screens/ForgotPassword";

// ------------------------------------
// Forgot Password
// ------------------------------------
export const FORGOT_PASSWORD_ROUTE: Route = createRoute({
  name: "Forgot Password",
  path: "/pw-forget",
  component: ForgotPassword,
});

export default FORGOT_PASSWORD_ROUTE;
