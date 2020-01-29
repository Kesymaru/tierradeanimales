import React, {FunctionComponent} from "react";
import {connect} from "react-redux";

import {default as MaterialAppBar} from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

import {IAppState, IAuthState} from "../../store";
import UserMenu from "./UserMenu";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface IAppBarProps extends Pick<IAuthState, 'logged'> {
    open: boolean;
    setOpen: Function;
}

const AppBar: FunctionComponent<IAppBarProps> = ({logged, open, setOpen}) => {
    const classes = useStyles();

    return <MaterialAppBar position="fixed" className={logged ? classes.appBar : ''}>
        <Toolbar>
            {logged &&
            <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={() => setOpen(!open)}
                className={classes.menuButton}
            >
                <MenuIcon/>
            </IconButton>}
            <Typography variant="h6" noWrap className={classes.title}>
                App Name
            </Typography>
            <UserMenu/>
        </Toolbar>
    </MaterialAppBar>;
};

interface IAppBarOwnProps extends Omit<IAppBarProps, 'logged'> {
}

const mapStateToProps = (state: IAppState, props: IAppBarOwnProps): IAppBarProps => ({
    ...props,
    logged: state.auth.logged,
});
export default connect(mapStateToProps)(AppBar);
