import { guestStore } from '$/lib/guest'
import React from 'react'
import Viewer from '$/components/Viewer'

function Page() {
  const {support} = guestStore(state=>({...state._data}))
  return (
    <main className='w-full min-h-screen'>
      <Viewer file={support}/>
    </main>
  )
}

export default Page
