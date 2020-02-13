import firebase from 'firebase';
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";

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

const config: IFirebaseConfig = {
    apiKey: "AIzaSyCHHJ0dpe8h5cfisKgOLsIKppZNrFbuRQk",
    appId: "app-id",
    projectId: "mywod-1c55e",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://mywod-1c55e.firebaseio.com/",
    storageBucket: "gs://mywod-1c55e.appspot.com",
    messagingSenderId: "sender-id",
    measurementId: "G-measurement-id",
};
const fire = firebase.initializeApp(config);

console.log('config firebase');

export default fire;
