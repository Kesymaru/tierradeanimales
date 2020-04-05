import React, { FunctionComponent } from "react";
import { Switch } from "react-router-dom";

import Route from "@/routes/models/route";
import AppRoute from "./Route";

interface RoutesProps {
  routes: Route[];
  logged: boolean;
}

const Router: FunctionComponent<RoutesProps> = ({ routes, logged = false }) => {
  return (
    <Switch>
      {routes.map((route: Route, i: number) => (
        <AppRoute key={i} logged={logged} {...route} />
      ))}
    </Switch>
  );
};

export default Router;
