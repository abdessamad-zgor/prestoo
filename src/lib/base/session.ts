import { Guest } from './guest';
import { Room } from './room';

export class Session {
  room: Room
  guests: Guest[]
  constructor(room: Room = (new Room()), guests: Guest[] = []){
    this.room = room
    this.guests = guests
  }

  verifyGuestCode(code: string) {

  }

  kickGuest(name: string) {

  }

  closeRoom(id: string) {

  }
}
