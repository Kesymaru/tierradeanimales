import Firebase from "./firebase";
import * as firebase from "firebase";

import fire from "../../fire";
import {IUser} from "../../store/user/user.types";

class Auth {

    public auth: firebase.auth.Auth;

    constructor() {
        this.auth = fire.auth()
    }

    public OnAuth(callback: Function) {
        this.auth.onAuthStateChanged(user => callback(user));
    }

    public SignUp(email: string, password: string)
        : Promise<firebase.auth.UserCredential> {
        /*let user = null;
        try {
            user = await Firebase.auth.createUserWithEmailAndPassword(email, password);

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
        }*/

        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    public SignIn(email: string, password: string)
        : Promise<firebase.auth.UserCredential> {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    public SignOut(): Promise<void> {
        return this.auth.signOut();
    }

    public UpdatePassword (password: string): Promise<void> {
        if(!this.auth.currentUser)
            return Promise.reject('There is no current user logged.');
        return this.auth.currentUser.updatePassword(password);
    }

    public ResetPassword(email: string): Promise<void> {
        return this.auth.sendPasswordResetEmail(email);
    }

    public UpdateUser(profile: IUser): Promise<void|string> {
        let user = this.auth.currentUser;
        if(!user) return Promise.reject('User not logged');

        return user.updateProfile(profile);
    }
}

export default Auth;
