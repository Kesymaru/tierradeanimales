import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route as ReactRouter, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";

import { Route as AppRoute } from "@/routes/models/route";
import { SIGN_IN_ROUTE } from "@/Auth/routes";

interface RouteProps extends AppRoute {}

const Route: FunctionComponent<RouteProps> = (route) => {
  const auth = useSelector((state) => state.firebase.auth);
  const logged = isLoaded(auth) && !isEmpty(auth);
  const render =
    route.auth && !logged
      ? (props: any) => (
          <Redirect
            to={{
              pathname: SIGN_IN_ROUTE.path,
              state: { from: props.location },
            }}
          />
        )
      : (props: any) => <route.component {...props} />;

  return <ReactRouter path={route.path} exact={route.exact} render={render} />;
};

export default AppRoute;
