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
  .onCreate(async (snap, context) => {
    const email = snap.get("email");
    const isAdmin = ADMIN_EMAILS.includes(email);
    await setCustomClaims(email, isAdmin);
    return snap.ref.set({ role: isAdmin ? "admin" : "user" }, { merge: true });
  });

async function setCustomClaims(email: string, isAdmin: boolean): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).admin === true) return;
  return admin.auth().setCustomUserClaims(user.uid, { admin: isAdmin });
}

async function grandAdminRole(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).admin === true) return;

  return admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  });
}
