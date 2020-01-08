import firebase from 'firebase'
import {ICredentials, ISignIn} from "../store";

interface IFirebaseConfig {
    apiKey: string;
    appId: string;
    projectId: string;
    authDomain?: string;
    databaseURL?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    measurementId?: string;
}

const DEFAULT_CONFIG: IFirebaseConfig = {
    apiKey: "AIzaSyCHHJ0dpe8h5cfisKgOLsIKppZNrFbuRQk",
    appId: "app-id",
    projectId: "mywod-1c55e",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    measurementId: "G-measurement-id",
};

let instance: Firebase|null = null;

/**
 * Firebase class singleton
 */
class Firebase {
    constructor(private config: IFirebaseConfig = DEFAULT_CONFIG) {
        console.log('firebase contructor', config, instance);

        if(instance) return instance = this;
        instance = this;

        firebase.initializeApp(this.config);
    }

    async signUp(credentials: ICredentials): Promise<firebase.auth.UserCredential> {
        let {email, password} = credentials;
        let user = null;
        try {
            user = firebase.auth()
                .createUserWithEmailAndPassword(email, password)

            console.log('signUp response', user);
        } catch (error) {
            console.log('error code', error);

            switch (error.code) {
                case 'auth/email-already-in-use':
                    throw new Error(`Email address ${email} already in use.`);
                case 'auth/invalid-email':
                    throw new Error(`Email address ${email} is invalid.`);
                case 'auth/operation-not-allowed':
                    throw new Error(`Error during sign up.`);
                case 'auth/weak-password':
                    throw new Error("Password is not strong enough.\n Add additional characters including special characters and numbers.");
                default:
                    throw error;
            }
        }

        return user;
    }

    signIn(credentials: ISignIn): Promise<firebase.auth.UserCredential> {
        let {email, password} = credentials;
        console.log("signIn", email, password);

        return firebase.auth()
            .signInWithEmailAndPassword(email, password);
    }
}

export default Firebase
