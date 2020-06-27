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

/* export interface CollectionsConfiguration {
  [key: string]: string;
} */

export interface CollectionsConfiguration {
  case: string;
  fosterHome: string;
  newsletter: string;
  user: string;
  contact: string;
}

export default FirebaseConfiguration;
