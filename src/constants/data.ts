import * as firebase from "firebase";
import "firebase/firestore";

import Data from "../models/data";

export const INIT_DATA: Data = {
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
};

export default INIT_DATA;
