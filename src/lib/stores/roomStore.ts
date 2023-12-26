import { create } from "zustand";
import { Room } from "../base/room"

interface RoomState {
  room: Room
  getRoom: (uid: string, roomId: string)=>Promise<void>

}

export const roomStore = create<RoomState>()((set)=>({

}))
