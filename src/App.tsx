import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect, useDispatch} from "react-redux";

import ROUTES from "./constants/routes";
import {AuthActions, IAuthState, IUser, TAppState, UserActions} from "./store";

// ------------------------------------
// Components
// ------------------------------------
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import GoalsList from "./components/GoalsList";
import NotFound from "./components/NotFound";
import Firebase from "./constants/firebase";

interface IAppProps extends Pick<IAuthState, 'logged' | 'token'> {}

const App: FunctionComponent<IAppProps> = ({logged, token}: IAppProps) => {
    const dispatch = useDispatch();

    // load the logged user
    if(token) Firebase.onAuth((user: IUser) => dispatch(UserActions.ReceiveUser(user)));

    return (
        <Router>
            <Navigation />
            <Switch>
                <Route exact path={ROUTES.home}>
                    {
                        logged ? <GoalsList/> : <SignIn/>
                    }
                </Route>
                <Route path={ROUTES.signup}>
                    <SignUp/>
                </Route>
                <Route path={ROUTES.signin}>
                    <SignIn/>
                </Route>
                <Route path={ROUTES.passwordForget}>
                    <ForgotPassword/>
                </Route>
                <Route path={ROUTES.goals}>
                    <GoalsList/>
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state: TAppState): IAppProps => ({
    logged: state.auth.logged,
    token: state.auth.token,
});
export default connect(mapStateToProps)(App);
