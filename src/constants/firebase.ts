import firebase from 'firebase'

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
    private static config: IFirebaseConfig;
    private static auth: firebase.auth.Auth;

    private constructor() {}

    public static get user(){
        console.log('get user', Firebase.auth.currentUser);
        return Firebase.auth.currentUser;
    }

    public static configure(config: IFirebaseConfig): void {
        Firebase.config = config;
        firebase.initializeApp(Firebase.config);
        Firebase.auth = firebase.auth();
    }

    public static onAuth(callback: Function) {
        Firebase.auth.onAuthStateChanged(user => callback(user));
    }

    public static signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
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

        return Firebase.auth.createUserWithEmailAndPassword(email, password);
    }

    public static signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return Firebase.auth.signInWithEmailAndPassword(email, password);
    }

    public static async signOut(): Promise<void> {
        Firebase.auth.signOut();
    }

    public static updatePassword (password: string): Promise<void> {
        if(!Firebase.auth.currentUser)
            return Promise.reject('There is no current user logged.');
        return Firebase.auth.currentUser.updatePassword(password);
    }

    public static resetPassword(email: string): Promise<void> {
        return Firebase.auth.sendPasswordResetEmail(email);
    }

    public static updateProfile(uid: string, value: any) {
        let user = Firebase.auth.currentUser;
        if(!user) return;
        return user.updateProfile({
            displayName: "Jane Q. user",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
    }
}

export default Firebase
