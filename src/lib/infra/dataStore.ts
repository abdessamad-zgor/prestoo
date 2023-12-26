import { app } from "./firebase.config";
import { Firestore, getFirestore } from "firebase/firestore";

export class DataStore {
  static db: Firestore = getFirestore(app)

  static async createUserDoc<T>(uid: string, doc: T){
    //
  }
}
