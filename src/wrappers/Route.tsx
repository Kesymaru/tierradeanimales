import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Route as ReactRouter, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import get from "lodash/get";

import { Route as AppRoute, AppState } from "@core/models";
import { SIGN_IN_ROUTE } from "@core/routes";

interface RouteProps extends AppRoute {}

const Route: FunctionComponent<RouteProps> = (route) => {
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const isAdmin = get(auth, "profile.token.claims.admin", false) as boolean;
  const logged = isLoaded(auth) && !isEmpty(auth);
  const redirect = (props: any) => (
    <Redirect
      to={{
        pathname: SIGN_IN_ROUTE.getPath(),
        state: { from: props.location },
      }}
    />
  );
  let render = (props: any) => <route.component {...props} />;
  if (route.auth && !logged) render = redirect;
  else if (route.admin && !isAdmin) render = redirect;

  return <ReactRouter path={route.path} exact={route.exact} render={render} />;
};

export default Route;
