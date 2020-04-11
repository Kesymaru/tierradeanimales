import * as firebase from "firebase";
import "firebase/firestore";

import Contact from "../models";

export const INIT_CONTACT: Contact = {
  name: "",
  email: "",
  phone: "",
  message: "",
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
};

export default INIT_CONTACT;
