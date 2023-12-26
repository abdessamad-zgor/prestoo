import { initializeApp, credential, ServiceAccount } from "firebase-admin";

const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
}


export const admin = initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL
})
