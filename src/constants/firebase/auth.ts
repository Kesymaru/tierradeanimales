import Firebase from "./firebase";
import * as firebase from "firebase";
import {IUser} from "../../store";

class Auth extends Firebase{

    public static OnAuth(callback: Function) {
        Auth.auth.onAuthStateChanged(user => callback(user));
    }

    public static SignUp(email: string, password: string)
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

        return Auth.auth.createUserWithEmailAndPassword(email, password);
    }

    public static SignIn(email: string, password: string)
        : Promise<firebase.auth.UserCredential> {
        return Auth.auth.signInWithEmailAndPassword(email, password);
    }

    public static SignOut(): Promise<void> {
        return Auth.auth.signOut();
    }

    public static UpdatePassword (password: string): Promise<void> {
        if(!Firebase.auth.currentUser)
            return Promise.reject('There is no current user logged.');
        return Firebase.auth.currentUser.updatePassword(password);
    }

    public static ResetPassword(email: string): Promise<void> {
        return Firebase.auth.sendPasswordResetEmail(email);
    }

    public static UpdateUser(profile: IUser): Promise<void|string> {
        let user = Firebase.auth.currentUser;
        if(!user) return Promise.reject('User not logged');

        return user.updateProfile(profile);
    }
}

export default Auth;
