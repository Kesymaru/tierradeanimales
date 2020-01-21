import React, {FunctionComponent, useState} from "react";
import {connect} from "react-redux";
import clsx from "clsx";
import {AppBar, Toolbar, IconButton, Typography, createStyles, makeStyles, Theme} from "@material-ui/core";
import {Menu as MenuIcon} from '@material-ui/icons';

import {TAppState, IAuthState} from "../../store";
import NavbarMenu from "./NavbarMenu";
import UserMenu from "./UserMenu";

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
    }),
);

interface INavbarProps extends Pick<IAuthState, 'logged'> {
};
const Navbar: FunctionComponent<INavbarProps> = ({logged}) => {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (<>
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, openMenu && classes.appBarShift)}>
            <Toolbar>
                {logged
                    ? (<IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <MenuIcon/>
                    </IconButton>)
                    : null
                }
                <Typography variant="h6" className={classes.title}>
                    Goals App
                </Typography>
                <UserMenu/>
            </Toolbar>
        </AppBar>
        {logged
            ? <NavbarMenu open={openMenu} setOpen={setOpenMenu}/>
            : null
        }
    </>);
};

const mapStateToProps = (state: TAppState): INavbarProps => ({
    logged: state.auth.logged,
});
export default connect(mapStateToProps)(Navbar);
