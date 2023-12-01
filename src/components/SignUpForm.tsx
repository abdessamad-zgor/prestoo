import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from "next/link";
import {auth} from "$/lib/firebase.config";
import { createUserWithEmailAndPassword } from 'firebase/auth';

type Credentials = {
  email: string,
  password: string,
  confirmPassword: string,
}

const SignUpForm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm<Credentials>()

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    try{
      let _ = await createUserWithEmailAndPassword(auth, data.email, data.password)
      location.href = "/auth/verify";
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-4/12'>
      <div className='p-4 bg-white rounded-lg shadow-lg py-4'>
        <div className='flex flex-col'>
          <label >Email:</label>
          <input className='w-full rounded border border-stone-300 py-px px-2 text-xl text-xl focus:border-sky-300 focus:shadow focus:shadow-sky-100' {...register("email")}/>
        </div>
        <div className='flex flex-col'>
          <label >Mot de passe:</label>
          <input className='w-full rounded border border-stone-300 py-px px-2 text-xl text-xl focus:border-sky-300 focus:shadow focus:shadow-sky-100' {...register("password")}/>
        </div>
        <div className='flex flex-col'>
          <label >Confirmé mot de passe:</label>
          <input className='w-full rounded border border-stone-300 py-px px-2 text-xl text-xl focus:border-sky-300 focus:shadow focus:shadow-sky-100' {...register("confirmPassword")}/>
        </div>
        <div className='text-center my-4'>
          <input type='submit' className='py-4 px-6 bg-sky-800 text-white text-center rounded-md font-bold' value="S'inscrire"/>
        </div>
      </div>
      <p className='text-sm font-light py-4'>Tu as déja un compte? <Link href="/auth/login">connexion.</Link></p>
    </form>
  )
}
export default SignUpForm
