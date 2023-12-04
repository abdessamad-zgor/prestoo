"use client"
import React, {useEffect, useState} from 'react'
import {onValue, ref, update} from "firebase/database"
import { presentationStore } from '$/lib/presentation'
import {Guest} from "$/lib/guest";
import { db } from '$/lib/firebase.config';
import { useNavigate } from 'react-router-dom';

function Start() {
  const navigate = useNavigate()
  const [guests, setGuests] = useState<Guest[]>([]);
  let {code, title, description, id, setPresentation} = presentationStore(state=>({...state._data, code: state.code, setPresentation: state.setPresentation}));

  useEffect(()=>{
    let guestRef = ref(db, "guests/"+ id)
    onValue(guestRef, (snapshot)=>{
      let guestsList = snapshot.val();
      if (!guestsList || guestsList.length==0) guestsList = [];
      setGuests(Object.keys(guestsList).map(k=>guestsList[k]));
    })
  }, [id])

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
          <div className='pt-12 px-0'>
            <h1 className='text-4xl text-white px-4 py-2 text-left rounded-lg shadow bg-stone-800'>Guests</h1>

            <div className='text-center overflow-scroll'>
              {
                guests.length == 0 ?
                  <p className='font-light text-white pt-12'>Personne n'a joint encore.</p>:
                  <ul>
                    {
                      guests.map(
                        (g,i)=>
                          <li key={i} className='px-2 py-4'>{g.username}</li>
                      )
                    }
                  </ul>
              }
            </div>
          </div>
          <div className='absolute z-10 p-2 bottom-0 left-0 right-0'>
            <button className='text-white rounded bg-indigo-700 py-2 font-bold w-full text-2xl' onClick={startPresentation}>Start</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Start
