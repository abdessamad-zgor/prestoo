import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig  = {
  apiKey: "AIzaSyAnUoA6tME3k07Agz7OwuWZEcBLj5zfSBs",
  authDomain: "sakora-31b92.firebaseapp.com",
  databaseURL: "https://sakora-31b92-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sakora-31b92",
  storageBucket: "sakora-31b92.appspot.com",
  messagingSenderId: "822656550700",
  appId: "1:822656550700:web:16e4719b7c8ab85b780e89",
  measurementId: "G-RBFWGSM9TW"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

