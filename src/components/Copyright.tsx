import React, {FunctionComponent} from "react";

import {Typography, Link} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => createStyles({
    copyRight: {
        margin: '10px 0',
        [theme.breakpoints.up('md')]: {
            marginLeft: drawerWidth,
        },
    },
}));

const Copyright: FunctionComponent<{}> = () => {
    const classes = useStyles();
    return <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className={classes.copyRight}>
        {'Copyright © '}
        <Link color="inherit" href={process.env.REACT_APP_DOMAIN}>
            {process.env.REACT_APP_NAME}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>;
};

export default Copyright;
