import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {create} from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "./firebase.config";

type UserState = {
  user: User | null
}

export const userStore = create<UserState>()(
  persist(
    (set)=>({
      user: null,
      loginUser: async (email: string, password: string) => {
        try{
          let user = await signInWithEmailAndPassword(auth, email, password);
          set((state)=>({...state, user: user.user}));
        } catch(err) {
          console.error("Login Error: ", err);
        }
      },
      signUpUser: async (email: string, password: string) => {
        try{
          let user = await createUserWithEmailAndPassword(auth, email, password);
          set((state)=>({...state, user: user.user}));
        } catch(err) {
          console.error("Signup Error: ", err)
        }
      } 
    }),
    {
      name: "prestoo-user"
    }
  )
)


