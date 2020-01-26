import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

import {IUser} from "../../store";

export interface IFirebaseConfig {
    apiKey: string;
    appId: string;
    projectId: string;
    authDomain?: string;
    databaseURL?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    measurementId?: string;
}

class Firebase {
    protected static config: IFirebaseConfig;
    protected static auth: firebase.auth.Auth;
    protected static storage: firebase.storage.Storage;
    protected static database: firebase.database.Database;

    public static Configure(config: IFirebaseConfig): void {
        Firebase.config = config;
        firebase.initializeApp(Firebase.config);

        Firebase.auth = firebase.auth();
        Firebase.storage = firebase.storage();
        Firebase.database = firebase.database();
    }
}

export default Firebase
