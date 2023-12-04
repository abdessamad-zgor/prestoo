"use client"
import React from 'react'
import {ref, update} from "firebase/database"
import { presentationStore } from '$/lib/presentation'
import { db } from '$/lib/firebase.config';
import { useNavigate } from 'react-router-dom';
import GuestsList from '$/components/GuestsList';

function Start() {
  const navigate = useNavigate()
  let {code, title, description, id, setPresentation} = presentationStore(state=>({...state._data, code: state.code, setPresentation: state.setPresentation}));

  const startPresentation = ()=>{
    const startedAt = Date.now()
    console.log(startedAt)
    update(ref(db), {[`presentations/${id}/startedAt`]: startedAt })
      .then(()=>{
        setPresentation({startedAt});
        if (id) navigate("/"+id);
      })  
    }

  return (
    <main className='w-full min-h-screen flex justify-center items-stretch bg-stone-700'>
      <div className='basis-2/3 flex flex-col justify-center items-center bg-white p-16'>
        <div className='text-left'>
          <h1 className='text-4xl py-4'>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className='basis-1/3 p-4 relative '>
        <div className='z-0'>
          <div className='flex flex-col'>
            <label className='py-2 text-white text-bold'>Rejoindre ce lien: </label>
            <input type='text' className='text-xl p-2 font-bold shadow-inner rounded-lg bg-white' disabled value="http://localhost:3000/guest/join"/>
          </div>
          <div className='flex flex-col'>
            <label className='py-2 text-white text-bold'>Entrer ce code: </label>
            <input type='text' className='text-xl p-2 font-bold shadow-inner rounded-lg bg-white' disabled value={code}/>
          </div>
          <GuestsList id={id as string}/>
          <div className='absolute z-10 p-2 bottom-0 left-0 right-0'>
            <button className='text-white rounded bg-indigo-700 py-2 font-bold w-full text-2xl' onClick={startPresentation}>Start</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Start
