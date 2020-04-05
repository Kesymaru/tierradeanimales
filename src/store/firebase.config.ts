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

const FirebaseConfig: IFirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "",
};

export default FirebaseConfig;
