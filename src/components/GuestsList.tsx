import React, {useState, useEffect} from 'react'
import {ref, onValue} from "firebase/database"
import { Guest } from '$/lib/guest';
import { db } from '$/lib/firebase.config';

type GuestsListProps = {
  id: string,
}

function GuestsList(props: GuestsListProps) {

  if(!props.id)
    return <></>
  
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(()=>{
    let guestRef = ref(db, "guests/"+ props.id)
    onValue(guestRef, (snapshot)=>{
      let guestsList = snapshot.val();
      if (!guestsList || guestsList.length==0) guestsList = [];
      setGuests(Object.keys(guestsList).map(k=>guestsList[k]));
    })
  }, [props.id])

  return (
    <div className='pt-8 px-0'>
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
  )
}

export default GuestsList
