import { User } from "firebase/auth";
import { Material } from "./material";

export class Host {
  user: User | null
  materials: Material[]
  followers: string[]
  follows: string[]

  constructor(
    user: User|null = null,
    materials: Material[] = [],
    followers: string[] = [],
    follows: string[] = []
  ) {
    this.user = user
    this.materials = materials
    this.followers = followers
    this.follows = follows
  }


}
