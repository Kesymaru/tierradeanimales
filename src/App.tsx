import React, {FunctionComponent, useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {CssBaseline, Container, Theme, makeStyles} from "@material-ui/core";

import * as ROUTES from "./constants/routes"
import Navigation from "./components/Navigation";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {IUser} from "./models";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

const App: FunctionComponent<{}> = () => {
    const classes = useStyles();
    const [user, setUser] = useState<IUser|null>(null);

    const handleSignIn = (user: IUser) => {
        console.log('user singin', user);
        setUser(user);
    };

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <Navigation user={user}/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Route path={ROUTES.SIGN_IN}>
                            <SignIn onSubmit={handleSignIn}/>
                        </Route>
                        <Route path={ROUTES.SIGN_UP} component={SignUp} />
                    </Container>
                </main>
                <CssBaseline />
            </div>
        </BrowserRouter>
    )
};

export default App;
