import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const ADMIN_EMAILS = ["andreyalfaro@gmail.com"];

export const addAdmin = functions.https.onCall((data, context) => {
  if (context?.auth?.token?.admin !== true) {
    return { error: "Request not authorized. User musth be an Admin." };
  }
  const { email } = data;
  return grandAdminRole(email).then(() => ({
    result: `Request fulfilled, ${email} is Admin now.`,
  }));
});

export const onCreateUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    return snap.ref.set({ role: "user" }, { merge: true });
  });

async function grandAdminRole(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).admin === true) return;

  return admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });
}
