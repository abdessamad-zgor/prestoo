import { app } from "./firebase.config";
import { Database ,getDatabase } from "firebase/database";

export class RealDB {
  static db: Database = getDatabase(app)

  static async setSessionNode(){
    // 
  }
}
