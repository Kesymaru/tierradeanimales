import React, {FunctionComponent} from "react";
import Typography from '@material-ui/core/Typography';
import {default as MaterialBreadcrumbs} from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {Link as RouterLink, useRouteMatch} from "react-router-dom";

import {getBreadcrumbs, IAppRoute} from "../../constants/routes"

interface IBreadcrumbsProps {
    paths?: IAppRoute[],
    title?: string,
}

const Breadcrumbs: FunctionComponent<IBreadcrumbsProps> = ({paths, title}) => {
    const match = useRouteMatch();
    const routes = paths || getBreadcrumbs(match.path);

    return <MaterialBreadcrumbs aria-label="breadcrumb">
        {routes.map((route, index) => index === routes.length - 1
            ? <Typography key={index} color="textPrimary">{title || route.name}</Typography>
            : (<Link key={index} color="textPrimary" component={RouterLink} to={route.path}>
                {route.name}
            </Link>)
        )}
    </MaterialBreadcrumbs>;
};

export default Breadcrumbs;
