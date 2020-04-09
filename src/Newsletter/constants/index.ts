import * as firebase from "@/newsletter/constants/node_modules/firebase";
import "@/newsletter/constants/node_modules/firebase/firestore";

import { Newsletter } from "@/newsletter/models";

export const NEWSLETTER_STORE: string = "newsletter";

export const INIT_NEWSLETTER: Newsletter = {
  email: "",
  subscribed: true,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
};

export default INIT_NEWSLETTER;
