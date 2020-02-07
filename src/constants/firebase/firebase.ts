import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";

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
    public static config: IFirebaseConfig;
    public static auth: firebase.auth.Auth;
    public static storage: firebase.storage.Storage;
    public static database: firebase.database.Database;
    public static firestore: firebase.firestore.Firestore;

    public static Configure(config: IFirebaseConfig): void {
        Firebase.config = config;
        firebase.initializeApp(Firebase.config);

        Firebase.auth = firebase.auth();
        Firebase.storage = firebase.storage();
        Firebase.database = firebase.database();
        Firebase.firestore = firebase.firestore();
    }
}

export default Firebase
