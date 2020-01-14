import React, {FunctionComponent} from 'react';
import {BrowserRouter} from "react-router-dom";
import {connect, useDispatch} from "react-redux";

import {ROUTES_ARRAY} from "./constants/routes";
import {IAuthState, IUser, TAppState, UserActions} from "./store";
import Firebase from "./constants/firebase";

import Navigation from "./components/Navigation";
import Router from "./wrappers/Router";


interface IAppProps extends Pick<IAuthState, 'logged' | 'token'> {}

const App: FunctionComponent<IAppProps> = ({logged, token}: IAppProps) => {
    const dispatch = useDispatch();

    // load the logged user
    if(token) Firebase.onAuth((user: IUser) => dispatch(UserActions.ReceiveUser(user)));

    return (
        <BrowserRouter>
            <Navigation />
            <Router logged={logged} routes={ROUTES_ARRAY}/>
        </BrowserRouter>
    );
};


const mapStateToProps = (state: TAppState): IAppProps => ({
    logged: state.auth.logged,
    token: state.auth.token,
});
export default connect(mapStateToProps)(App);
