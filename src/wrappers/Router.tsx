import React, {FunctionComponent} from "react";
import {Switch} from "react-router-dom";

import {IAppRoute} from "../constants";
import Route from "./Route";

interface RoutesProps {
    routes: IAppRoute[];
    logged: boolean;
}
const Router: FunctionComponent<RoutesProps> = ({routes, logged = false}) => {
    console.log('app router', logged, routes);
    return (<Switch>
        {routes.map((route: IAppRoute, i: number) => (
            <Route key={i} logged={logged} {...route}/>
        ))}
    </Switch>)
};

export default Router;
