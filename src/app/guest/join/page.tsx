"use client"

import React, { useState, useEffect } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {push, ref, set, onValue} from "firebase/database"
import { Guest, guestStore } from '$/lib/guest'
import { db } from '$/lib/firebase.config'
import { useRouter } from 'next/navigation'
import GuestsList from '$/components/GuestsList'

function Join() {
  const router = useRouter()
  const [guests, setGuests] = useState<Guest[]>([])
  const { id, startedAt, setPresentation } = guestStore(state=>
    ({ id: state._data?.id,
      startedAt: state._data?.startedAt,
      setPresentation: state.setPresentation
    }))
  const {register, handleSubmit} = useForm<Pick<Guest, "username">>();

  useEffect(()=>{
    const guestsRef = ref(db, "guests/"+id);
    const startedAtRef = ref(db, "presentations/"+id+"/startedAt")
    onValue(guestsRef, (snapshot)=>{
      const guestsList = snapshot.val()
      setGuests(Object.keys(guestsList).map(k=>guestsList[k]));
    });

    onValue(startedAtRef, (snapshot)=>{
      const data = snapshot.val();
      setPresentation({startedAt: data})
    })
  }, [])

  useEffect(()=>{
    if(startedAt)
      router.replace("/guest/"+id);
  }, [startedAt]);

  const onSubmit: SubmitHandler<Pick<Guest, "username">> = async (data)=>{
    const guestsRef = ref(db, "guests/"+id);
    const newGuestRef = push(guestsRef);
    try {
      await set(newGuestRef, {
        id: crypto.randomUUID(),
        username: data.username
      });
    } catch (error) {
      console.error("Error: failed to add guest to presentation, ", error)
    }
  }

  return (
    <main className='w-full min-h-screen bg-stone-100 flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='rounded p-4 flex flex-col justify-center items-center'>
        <div className='flex flex-col py-2'>
          <label htmlFor="" className='font-bold '>Entrer un nom d'utilisateur: </label>
          <input type="text" {...register("username")} className='shadow-inner p-2 rounded border' />
        </div>
        <input type='submit' value="Joindre" className='text-white font-bold bg-indigo-700 rounded px-12 py-2'/>
      </form>
      <GuestsList id={id as string}/>
    </main>
  )
}

export default Join
