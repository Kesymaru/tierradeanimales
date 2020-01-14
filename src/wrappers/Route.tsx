import React, {FunctionComponent} from "react";
import {Route as ReactRouter, Redirect} from "react-router-dom";

import {IAppRoute, SIGN_IN_ROUTE} from "../constants";

interface RouteProps extends IAppRoute {
    logged: boolean;
};
const Route: FunctionComponent<RouteProps> = (route) => {
    let render = null;
    if (route.auth && !route.logged) render = (props: any) => (<Redirect
        to={{
            pathname: SIGN_IN_ROUTE.path,
            state: {from: props.location}
        }}
    />);
    else render = (props: any) => (<route.component {...props}/>);

    return (<ReactRouter
        path={route.path}
        exact={route.exact}
        render={render}
    />)
};

export default Route;
