import React, {FunctionComponent, useState} from "react";
import {useRouteMatch} from "react-router-dom"
import {connect} from "react-redux";
import clsx from "clsx";
import {
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    createStyles,
    makeStyles,
    Theme
} from "@material-ui/core";
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    Dashboard as DashboardIcon,
} from '@material-ui/icons';

import {ISystemState, TAppState} from "../store";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
    }),
);

interface INavigationProps extends ISystemState{};

const Navigation: FunctionComponent<INavigationProps> = ({user, loggedIn }: INavigationProps) => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const match = useRouteMatch();

    console.log('navigation', match);

    let menuButton = null;
    let drawer = null;
    if (loggedIn) {
        menuButton =
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon/>
            </IconButton>;

        drawer =
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
                }}
                open={openDrawer}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                </List>
            </Drawer>
    }

    return (
        <>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
                <Toolbar>
                    { menuButton }
                    <Typography variant="h6" className={classes.title}>
                        Goals App
                    </Typography>
                    <Button color="inherit">
                        SignIn
                    </Button>
                </Toolbar>
            </AppBar>
            { drawer }
        </>
    );
};

const mapStateToProps = (state: TAppState) => ({...state.system});

export default connect(mapStateToProps)(Navigation);
