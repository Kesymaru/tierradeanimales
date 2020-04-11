import * as firebase from "firebase";
import "firebase/firestore";

export interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: firebase.firestore.FieldValue;
}

export default Contact;
