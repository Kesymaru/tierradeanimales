import React, {FunctionComponent, useState} from 'react';
import {ConnectedRouter} from 'connected-react-router'
import {connect, useDispatch} from "react-redux";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

import ROUTES from "./constants/routes";
import AppStore, {AuthActions, IAppState, IAuthState, IUser, UserActions} from "./store";
import Auth from "./constants/firebase/auth"

import Router from "./wrappers/Router";
import Copyright from "./components/Copyright";
import Notify from "./components/Notify";
import Navbar from "./components/Navbar/Navbar";
import AppBar from "./components/Navbar/AppBar";
import ScrollTop from "./components/Navbar/ScrollTop";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            [theme.breakpoints.up('md')]: {
                marginLeft: drawerWidth,
            },
        },
    }),
);

interface IAppProps extends Pick<IAuthState, 'logged'> {
}

const App: FunctionComponent<IAppProps> = ({logged}: IAppProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const anchorId: string = 'back-to-top-anchor';

    Auth.OnAuth((user: IUser) => user
        ? dispatch(UserActions.ReceiveUser(user))
        : dispatch(AuthActions.SingOut()));

    return (<>
        <ConnectedRouter history={AppStore.history}>
            <AppBar open={open} setOpen={setOpen} anchorId={anchorId}/>
            <Navbar open={open} setOpen={setOpen}/>

            <main className={classes.content}>
                <Router logged={logged} routes={ROUTES}/>
                <ScrollTop anchorId={anchorId}/>
            </main>
        </ConnectedRouter>
        <Copyright/>
        <Notify/>
    </>);
};

const mapStateToProps = (state: IAppState): IAppProps => ({
    logged: state.auth.logged,
});
export default connect(mapStateToProps)(App);
