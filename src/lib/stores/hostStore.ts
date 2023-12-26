import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Authenticator } from "../infra/authenticator";
import { Host } from "../base/host";
import { Session } from "../base/session";



interface HostState {
  host: Host | null
  session?: Session
  signIn: {
    pending: boolean,
    error: string | null,
    call: (email: string, password: string) => Promise<void>
  },
  signUp: {
    pending: boolean,
    error: string | null,
    call: (email: string, password: string) => Promise<void>
  }
}

export const hostStore = create<HostState>()(
  persist(
    (set)=>({
      host: null,
      signIn: {
        pending: false,
        error: null,
        call: async (email: string, password: string) => {
          set((state)=>({...state, signIn: {...state.signIn, pending: true, error: null}}))
          try{
            let {data, error} = await Authenticator.signIn(email, password)
            if(data) {
              let host = new Host(data.user)
              set((state)=>({...state, host: host, signIn: {...state.signIn, pending: false}}));
            } else {
              set((state)=>({...state, signIn: {...state.signIn, pending: false, error: error}}));
            }
          } catch(err) {
            console.error("Login Error: ", err);
          }
        }
      },
      signUp: {
        pending: false,
        error: null,
        call: async (email: string, password: string) => {
          set((state)=>({...state, signUp: {...state.signUp, pending: true, error: null}}))
          try{
            let {data, error} = await Authenticator.signUp(email, password);
            if (data){ 
              let host = new Host(data.user)
              set((state)=>({...state, host: host}));
            } else {
              set((state)=>({...state, signUp: {...state.signUp, pending: false, error: error}}));
            }
          } catch(err) {
            console.error("Signup Error: ", err)
          }
        }
      } 
    }),
    {
      name: "prestoo-user"
    }
  )
)


