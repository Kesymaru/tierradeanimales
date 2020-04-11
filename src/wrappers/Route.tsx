import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route as ReactRouter, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";

import { Route as AppRoute, AppState } from "@core/models";
import { SIGN_IN_ROUTE } from "@core/routes";

interface RouteProps extends AppRoute {}

const Route: FunctionComponent<RouteProps> = (route) => {
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const logged = isLoaded(auth) && !isEmpty(auth);
  const render =
    route.auth && !logged
      ? (props: any) => (
          <Redirect
            to={{
              pathname: SIGN_IN_ROUTE.getPath(),
              state: { from: props.location },
            }}
          />
        )
      : (props: any) => <route.component {...props} />;

  return <ReactRouter path={route.path} exact={route.exact} render={render} />;
};

export default Route;
