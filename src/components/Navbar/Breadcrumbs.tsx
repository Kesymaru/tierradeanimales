import React, {FunctionComponent, ReactElement} from "react";
import Typography from '@material-ui/core/Typography';
import {default as MaterialBreadcrumbs} from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Link as RouterLink, useRouteMatch} from "react-router-dom";

import {useRoutes, IAppRoute} from "../../constants/routes"

interface IBreadcrumbsProps {
    paths?: IAppRoute[],
    title?: string,
    children?: ReactElement
}

const Breadcrumbs: FunctionComponent<IBreadcrumbsProps> = ({paths, title, children}) => {
    const match = useRouteMatch();
    // const routes = paths || useRoutes(match.path);

    return <MaterialBreadcrumbs aria-label="breadcrumb">
        {/*{routes.map((route, index) => index === routes.length - 1
            ? <Typography sortBy={index} color="textPrimary">{name || route.name}</Typography>
            : (<Link sortBy={index} color="textPrimary" component={RouterLink} to={route.path}>
                {route.name}
            </Link>)
        )}*/}
    </MaterialBreadcrumbs>;
};

export default Breadcrumbs;
