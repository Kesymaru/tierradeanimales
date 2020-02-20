import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import App from "./App";
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppStore from "./store/app.store";

// ------------------------------------
// Configure App
// ------------------------------------
AppStore.Configure();

const AppRoot: FunctionComponent = () => (
    <Provider store={AppStore.store}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <App/>
        </MuiPickersUtilsProvider>
    </Provider>
);

ReactDOM.render(<AppRoot/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
