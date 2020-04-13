import React, { FunctionComponent, useState, Suspense } from "react";
import { ConnectedRouter } from "connected-react-router";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

import Router from "../../wrappers/Router";
import Route from "@core/models/route";
import { AppHistory } from "@core/store";
import {
  AppBar,
  AppLoading,
  Navbar,
  ScrollTop,
  Copyright,
} from "@core/components";
import { ROUTES } from "@core/routes";
import { HOME_ROUTE } from "@app/home";
import AppState from "@core/models/store";
import AppAlert from "./AppAlert";

const HIDE_ROUTES: Array<Route> = [HOME_ROUTE];
const anchorId: string = "back-to-top-anchor";

// loading component for suspense fallback
const AppLoader: FunctionComponent = () => (
  <div className="App">
    {/*<img src={logo} className="App-logo" alt="logo" />*/}
    <div>Loading...</div>
  </div>
);

const AuthIsLoaded: FunctionComponent<any> = (props) => {
  const auth = useSelector<AppState, any>((state) => state.firebase.auth);
  const loading = !isLoaded(auth);
  if (loading) return <AppLoading loading={loading} />;
  return props.children;
};

export const App: FunctionComponent<{}> = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Suspense fallback={<AppLoader />}>
      <ConnectedRouter history={AppHistory}>
        <AppBar open={open} setOpen={setOpen} anchorId={anchorId} />
        <Navbar open={open} setOpen={setOpen} />
        <main style={{ marginTop: 20 }}>
          <AuthIsLoaded>
            <Router routes={ROUTES} />
          </AuthIsLoaded>
          <ScrollTop anchorId={anchorId} />
          <Copyright hideRoutes={HIDE_ROUTES} />
          <AppAlert />
        </main>
      </ConnectedRouter>
    </Suspense>
  );
};

export default App;
