import React from 'react'
import Appbar from '$/components/Appbar'

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='w-full min-h-screen flex flex-col '>
      <Appbar />
      <div className='flex-1 flex flex-col items-center bg-slate-100 justify-center'>
        {children}
      </div>
    </main>
  )
}
