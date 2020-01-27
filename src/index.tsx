import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import App from "./App";
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppStore from "./store";
import Firebase from "./constants/firebase/firebase";
import LocalStorage from "./constants/localStorage";

// ------------------------------------
// Configure App
// ------------------------------------
AppStore.Configure();

LocalStorage.configure({
    keys: [{
        key: 'token',
        path: 'system.auth.token'
    }]
});

Firebase.Configure({
    apiKey: "AIzaSyCHHJ0dpe8h5cfisKgOLsIKppZNrFbuRQk",
    appId: "app-id",
    projectId: "mywod-1c55e",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://mywod-1c55e.firebaseio.com/",
    storageBucket: "gs://mywod-1c55e.appspot.com",
    messagingSenderId: "sender-id",
    measurementId: "G-measurement-id",
});

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
