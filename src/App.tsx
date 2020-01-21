import React, {FunctionComponent} from 'react';
import {BrowserRouter} from "react-router-dom";
import {connect, useDispatch} from "react-redux";

import {ROUTES_ARRAY} from "./constants/routes";
import {IAuthState, IUser, TAppState, UserActions} from "./store";
import Firebase from "./constants/firebase";

import Navbar from "./components/Navbar";
import Router from "./wrappers/Router";
import Copyright from "./components/Copyright";
import Notify from "./components/Notify";

interface IAppProps extends Pick<IAuthState, 'logged'> {}
const App: FunctionComponent<IAppProps> = ({logged}: IAppProps) => {
    const dispatch = useDispatch();

    Firebase.onAuth((user: IUser) => user ? dispatch(UserActions.ReceiveUser(user)) : null);

    return (<>
        <BrowserRouter>
            <Navbar/>
            <Router logged={logged} routes={ROUTES_ARRAY}/>
        </BrowserRouter>
        <Copyright/>
        <Notify/>
    </>);
};

const mapStateToProps = (state: TAppState): IAppProps => ({
    logged: state.auth.logged,
});
export default connect(mapStateToProps)(App);
