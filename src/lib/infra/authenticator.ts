import { FirebaseError } from "firebase/app";
import { 
  Auth,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { app } from "./firebase.config";

export class Authenticator {
  static auth: Auth = getAuth(app);
  
  static async signIn(email: string, password: string){
    try {
      let userCredential = await signInWithEmailAndPassword(Authenticator.auth, email, password);
      return {data: userCredential, error: null}
    } catch (error) {
      if(error instanceof FirebaseError) {
        switch(error.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            return {
              data: null,
              error: "Invalid email or password. Please enter correct credentials."
            };
          case AuthErrorCodes.INVALID_PASSWORD:
            return {
              data: null,
              error: "Invalid email or password. Please enter correct credentials."
            };
          default:
            return {
              data: null,
              error: "Something went wrong. Please try later."
            };
        }
      }
      throw error
    }
  }

  static async signUp(email:string, password: string){
    try {
      let userCredential = await createUserWithEmailAndPassword(Authenticator.auth, email, password)
      return { data: userCredential, error: null }
    } catch (error) {
      if(error instanceof FirebaseError) {
        switch(error.code) {
          case AuthErrorCodes.EMAIL_EXISTS:
            return { data: null, error: "Email already exists, try another email." }
          default:
            return { data: null, error: "Something went wrong, please try again" }
        }
      }
      throw error
    }
  }
  static currentUser(){
    return Authenticator.auth.currentUser
  }
}
