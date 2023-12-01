"use client"
import React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {ref, set} from "firebase/database"
import { Guest, guestStore } from '$/lib/guest'
import { db } from '$/lib/firebase.config'



function Join() {
  const {id} = guestStore(state=>({id: state._data?.id}))
  const {register, handleSubmit} = useForm<Guest>();

  const onSubmit: SubmitHandler<Guest> = async (data)=>{

  }

  return (
    <main className='w-full min-h-screen bg-stone-100 flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='rounded p-4'>
        <div className='flex flex-col py-2'>
          <label htmlFor="" className='font-bold '>Entrer un nom d'utilisateur: </label>
          <input type="text" {...register("username")} className='shadow-inner p-2 rounded border' />
        </div>
        <input type='submit' value="Joindre" className='text-white font-bold bg-indigo-700 rounded'/>
      </form>
    </main>
  )
}

export default Join
