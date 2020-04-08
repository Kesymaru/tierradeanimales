import React, { FunctionComponent } from "react";
import { Switch } from "react-router-dom";

import Route from "@/App/models/route";
import AppRoute from "./Route";

interface RouterProps {
  routes: Route[];
}

const Router: FunctionComponent<RouterProps> = (props) => {
  return (
    <Switch>
      {props.routes.map((route: Route, i: number) => (
        <AppRoute key={i} {...route} />
      ))}
    </Switch>
  );
};

export default Router;
