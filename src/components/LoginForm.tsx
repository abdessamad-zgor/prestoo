import React from 'react'
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link';
import {auth} from "$/lib/firebase.config";
import { signInWithEmailAndPassword } from 'firebase/auth';

type Credentials = {
  email: string,
  password: string
}

export default function LoginForm() {
  const {register, handleSubmit, formState: {errors}} = useForm<Credentials>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Credentials> = async (data)=>{
    try{
      let _ = await signInWithEmailAndPassword(auth, data.email, data.password);
      router.replace("/dashboard")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-4/12'>
      <div className='p-4 bg-white rounded-lg shadow-lg w-full'>
        <div className='flex flex-col'>
          <label>Email:</label>
          <input className='w-full rounded border border-stone-300 py-px px-2 text-xl text-xl focus:border-sky-300 focus:shadow focus:shadow-sky-100' {...register("email")}/>
        </div>
        <div>
          <label>Mot de passe:</label>
          <input className='w-full rounded border border-stone-300 py-px px-2 text-xl text-xl focus:border-sky-300 focus:shadow focus:shadow-sky-100' {...register("password")}/>
        </div>
        <div className='text-center my-4'>
          <input type="submit" className='py-4 px-6 bg-sky-800 text-white text-center rounded-md font-bold' value="Connexion"/>
        </div>
      </div>
      <p className='text-sm font-light py-4'>Tu n'as pas de compte ? <Link href="/auth/signup">S'inscrire.</Link></p>
    </form> 
  )
}
