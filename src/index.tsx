import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import "./index.css";
import "./i18n";
import * as serviceWorker from "./serviceWorker";

// import { App, AppStore, RrfProps } from "@/App";
import App from "./App/components/App";
import { AppStore, RrfProps } from "@/App/store";

const AppRoot: FunctionComponent = () => (
  <Provider store={AppStore}>
    <ReactReduxFirebaseProvider {...RrfProps}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </ReactReduxFirebaseProvider>
  </Provider>
);

ReactDOM.render(<AppRoot />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
