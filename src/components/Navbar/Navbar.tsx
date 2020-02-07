import React, {FunctionComponent} from "react";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import {IAppState, IAuthState} from "../../store";
import {connect} from "react-redux";
import NavbarMenu from "./NavbarMenu";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
    }),
);

interface INavbarProps extends Pick<IAuthState, 'logged'> {
    open: boolean;
    setOpen: Function;
}

const Navbar: FunctionComponent<INavbarProps> = ({logged, open, setOpen}) => {
    const classes = useStyles();
    const theme = useTheme();

    if(!logged) return <div></div>;

    return <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="js">
            <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={open}
                onClose={() => setOpen(!open)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <NavbarMenu open={open} setOpen={setOpen}/>
            </Drawer>
        </Hidden>
        <Hidden smDown implementation="js">
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                <NavbarMenu open={open} setOpen={setOpen}/>
            </Drawer>
        </Hidden>
    </nav>
};

interface INarvarOwnProps extends Omit<INavbarProps, 'logged'> {
}

const mapStateToProps = (state: IAppState, props: INarvarOwnProps): INavbarProps => ({
    ...props,
    logged: state.auth.logged,
});
export default connect(mapStateToProps)(Navbar);
