import * as firebase from "firebase";
import "firebase/firestore";

export interface Data {
  id?: string;
  createdAt: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
  createdBy?: string;
  updatedBy?: string;
}

export default Data;
