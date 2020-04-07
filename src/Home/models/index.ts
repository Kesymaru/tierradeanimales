// import * as firebase from "firebase/app";
// import "firebase/firestore";

export interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Newsletter {
  email: string;
  // createdAt: firebase.firestore.FieldValue.serverTimestamp;
  createdAt: Date | string;
}

export interface NewsletterState {
  newsletters: Array<string>;
}

export default NewsletterState;
