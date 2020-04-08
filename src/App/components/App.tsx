import React, { FunctionComponent, useState, Suspense } from "react";
import { ConnectedRouter } from "connected-react-router";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { AppHistory } from "../store";
import { ROUTES } from "../routes";

import Router from "../../wrappers/Router";
import Navbar from "./Navbar";
import AppBar from "./AppBar";
import ScrollTop from "./ScrollTop";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pinned: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
  })
);

// loading component for suspense fallback
const AppLoader: FunctionComponent<{}> = () => (
  <div className="App">
    {/*<img src={logo} className="App-logo" alt="logo" />*/}
    <div>Loading...</div>
  </div>
);

export const App: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [pinned, setPinned] = useState<boolean>(false);
  const anchorId: string = "back-to-top-anchor";

  return (
    <Suspense fallback={<AppLoader />}>
      <ConnectedRouter history={AppHistory}>
        <AppBar open={open} setOpen={setOpen} anchorId={anchorId} />
        <Navbar open={open} setOpen={setOpen} />
        <main className={open ? classes.pinned : ""}>
          <Router routes={ROUTES} />
          <ScrollTop anchorId={anchorId} />
        </main>
      </ConnectedRouter>
    </Suspense>
  );
};

export default App;
