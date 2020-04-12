export interface FirebaseConfiguration {
  apiKey: string;
  appId: string;
  projectId: string;
  authDomain?: string;
  databaseURL?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  measurementId?: string;
}

export interface CollectionsConfiguration {
  [key: string]: string;
}

export default FirebaseConfiguration;
