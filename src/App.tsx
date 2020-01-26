import React, {FunctionComponent} from 'react';
import {ConnectedRouter} from 'connected-react-router'
import {connect, useDispatch} from "react-redux";

import {ROUTES_ARRAY} from "./constants/routes";
import AppStore, {AuthActions, IAppState, IAuthState, IUser, UserActions} from "./store";
import {Auth} from "./constants/firebase";

import Navbar from "./components/Navbar";
import Router from "./wrappers/Router";
import Copyright from "./components/Copyright";
import Notify from "./components/Notify";

interface IAppProps extends Pick<IAuthState, 'logged'> {
}

const App: FunctionComponent<IAppProps> = ({logged}: IAppProps) => {
    const dispatch = useDispatch();

    Auth.OnAuth((user: IUser) => user
        ? dispatch(UserActions.ReceiveUser(user))
        : dispatch(AuthActions.SingOut()));

    return (<>
        <ConnectedRouter history={AppStore.history}>
            <Navbar/>
            <Router logged={logged} routes={ROUTES_ARRAY}/>
        </ConnectedRouter>
        <Copyright/>
        <Notify/>
    </>);
};

const mapStateToProps = (state: IAppState): IAppProps => ({
    logged: state.auth.logged,
});
export default connect(mapStateToProps)(App);
