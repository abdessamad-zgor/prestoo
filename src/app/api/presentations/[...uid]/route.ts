import {admin} from "$/lib/firebase-admin.config"
import { getDatabase } from "firebase-admin/database"

export function GET(req: Request) {
  const {uid} =  
  const database = getDatabase(admin)
}
