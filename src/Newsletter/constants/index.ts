import * as firebase from "firebase";
import "firebase/firestore";

import { Newsletter } from "../models";

export const NEWSLETTER_PATH: string = "newsletter";

export const INIT_NEWSLETTER: Newsletter = {
  email: "",
  subscribed: true,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
};

export default INIT_NEWSLETTER;
