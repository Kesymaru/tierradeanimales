import React, { FunctionComponent, useState, Suspense } from "react";
import { ConnectedRouter } from "connected-react-router";

import { AppHistory, ROUTES } from "@/App";

import Router from "../../wrappers/Router";
import Navbar from "../../components/Navbar/Navbar";
import AppBar from "../../components/Navbar/AppBar";
import ScrollTop from "../../components/Navbar/ScrollTop";

// loading component for suspense fallback
const AppLoader: FunctionComponent<{}> = () => (
  <div className="App">
    {/*<img src={logo} className="App-logo" alt="logo" />*/}
    <div>Loading...</div>
  </div>
);

const App: FunctionComponent<{}> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorId: string = "back-to-top-anchor";

  return (
    <Suspense fallback={<AppLoader />}>
      <ConnectedRouter history={AppHistory}>
        <AppBar open={open} setOpen={setOpen} anchorId={anchorId} />
        <Navbar open={open} setOpen={setOpen} />
        <main>
          <Router logged={true} routes={ROUTES} />
          <ScrollTop anchorId={anchorId} />
        </main>
      </ConnectedRouter>
    </Suspense>
  );
};

export default App;
