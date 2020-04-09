import * as firebase from "@/newsletter/models/node_modules/firebase";
import "@/newsletter/models/node_modules/firebase/firestore";

export interface Newsletter {
  email: string;
  subscribed: boolean;
  createdAt: firebase.firestore.FieldValue;
}

export interface NewsletterState {
  newsletters: Array<Newsletter>;
}

export default NewsletterState;
