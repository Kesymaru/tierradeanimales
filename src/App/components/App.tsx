import React, { FunctionComponent, useState, Suspense } from "react";
import { ConnectedRouter } from "connected-react-router";

import Router from "../../wrappers/Router";

import Route from "@core/models/route";
import { AppHistory } from "@/App/store";
import { AppBar, Navbar, ScrollTop, Copyright } from "@/App/components";
import { ROUTES, HOME_ROUTE } from "@/App/routes";

// loading component for suspense fallback
const AppLoader: FunctionComponent<{}> = () => (
  <div className="App">
    {/*<img src={logo} className="App-logo" alt="logo" />*/}
    <div>Loading...</div>
  </div>
);

const HIDE_ROUTES: Array<Route> = [HOME_ROUTE];

export const App: FunctionComponent<{}> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorId: string = "back-to-top-anchor";

  return (
    <Suspense fallback={<AppLoader />}>
      <ConnectedRouter history={AppHistory}>
        <AppBar open={open} setOpen={setOpen} anchorId={anchorId} />
        <Navbar open={open} setOpen={setOpen} />
        <main>
          <Router routes={ROUTES} />
          <ScrollTop anchorId={anchorId} />
          <Copyright hideRoutes={HIDE_ROUTES} />
        </main>
      </ConnectedRouter>
    </Suspense>
  );
};

export default App;
