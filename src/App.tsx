import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import ROUTES from "./constants/routes";
import {TAppState} from "./store";

// components
import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import GoalsList from "./components/GoalsList";

interface AppProps {
    loggedIn: boolean;
}

const App: FunctionComponent<AppProps> = ({loggedIn = false}: AppProps) => (
    <Router>
        <Navigation />
        <Switch>
            {/*<Route path={ROUTES.home}>
                {
                    loggedIn ? <GoalsList/> : <SignIn/>
                }
            </Route>*/}
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
        </Switch>
    </Router>
);

const mapStateToProps = (state: TAppState) => ({
    loggedIn: state.system.loggedIn
});

export default connect(mapStateToProps)(App);
