import * as firebase from "firebase";
import "firebase/firestore";

import Data from "../models/data";

export const DATA_INIT: Data = {
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
};
