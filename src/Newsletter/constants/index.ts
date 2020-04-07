import * as firebase from "firebase";
import "firebase/firestore";

import { Newsletter } from "@/Newsletter/models";

export const NEWSLETTER_STORE: string = "newsletter";

export const INIT_NEWSLETTER: Newsletter = {
  email: "",
  subscribed: true,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
};

export default INIT_NEWSLETTER;
