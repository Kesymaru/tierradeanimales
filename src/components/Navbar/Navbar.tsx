import React, {FunctionComponent, useState} from "react";
import {useLocation, useHistory} from "react-router-dom"
import {connect, useDispatch} from "react-redux";
import clsx from "clsx";
import {
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

import {TAppState, AuthActions, IUserState, IAuthState} from "../../store";
import ROUTES from "../../constants/routes";
import NavbarMenu from "./NavbarMenu";

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

interface INavbarProps extends Pick<IUserState, 'user'>, Pick<IAuthState, 'logged'>{};
const Navbar: FunctionComponent<INavbarProps> = ({user, logged }) => {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    // console.log('navigation', location, user, logged);

    let menuButton = null;
    let button = null;

    if (logged) {
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

        /*drawer =
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
            </Drawer>;*/

        button =
            <Button
                color="inherit"
                onClick={() => dispatch(AuthActions.SingOut())}
            >
                SignOut
            </Button>;
    } else {
        button = location.pathname === ROUTES.signIn.path
            ? null
            : (
                <Button
                    color="inherit"
                    onClick={() => history.push(ROUTES.signIn.path)}
                >
                    SignIn
                </Button>
            );
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
                    { button }
                </Toolbar>
            </AppBar>
            { logged
                ? <NavbarMenu open={openDrawer} setOpen={setOpenDrawer}/>
                : null
            }
        </>
    );
};

const mapStateToProps = (state: TAppState): INavbarProps => ({
    logged: state.auth.logged,
    user: state.user.user || null,
});
export default connect(mapStateToProps)(Navbar);
