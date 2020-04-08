import * as firebase from "firebase";
import "firebase/firestore";

export interface Newsletter {
  email: string;
  subscribed: boolean;
  createdAt: firebase.firestore.FieldValue;
}

export interface NewsletterState {
  newsletters: Array<Newsletter>;
}

export default NewsletterState;