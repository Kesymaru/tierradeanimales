import React, {FunctionComponent, useState, Suspense} from 'react';
import {ConnectedRouter} from 'connected-react-router'
import {connect, useDispatch} from "react-redux";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

import Auth from "./constants/firebase/auth";
import AppStore from "./store/app.store";
import IAppState from "./store/app.types";
import IAuthState from "./store/auth/auth.types";
import {IUser} from "./store/user/user.types";
import {ReceiveUser} from "./store/user/user.actions";
import {SingOut} from "./store/auth/auth.actions";
import ROUTES from "./routes";

import Router from "./wrappers/Router";
import Copyright from "./components/Copyright";
import Notify from "./components/Notify";
import Navbar from "./components/Navbar/Navbar";
import AppBar from "./components/Navbar/AppBar";
import ScrollTop from "./components/Navbar/ScrollTop";

const auth = new Auth();
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

// loading component for suspense fallback
const Loader: FunctionComponent<{}> = () => (
    <div className="App">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <div>Loading...</div>
    </div>
);

const App: FunctionComponent<IAppProps> = ({logged}: IAppProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const anchorId: string = 'back-to-top-anchor';

    auth.OnAuth((user: IUser) => user
        ? dispatch(ReceiveUser(user))
        : dispatch(SingOut()));

    return (<Suspense fallback={<Loader/>}>
        <ConnectedRouter history={AppStore.history}>
            <AppBar open={open} setOpen={setOpen} anchorId={anchorId}/>
            <Navbar open={open} setOpen={setOpen}/>

            {/*<main className={classes.content}>*/}
            <main>
                <Router logged={logged} routes={ROUTES}/>
                <ScrollTop anchorId={anchorId}/>
            </main>
        </ConnectedRouter>
        <Copyright/>
        <Notify/>
    </Suspense>);
};

const mapStateToProps = (state: IAppState): IAppProps => ({
    logged: state.auth.logged,
});
export default connect(mapStateToProps)(App);
