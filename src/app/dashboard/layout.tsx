import React from 'react'
import Appbar from '$/components/Appbar'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <main className='w-full min-h-screen flex flex-col items-center bg-slate-100 justify-center'>
      <Appbar/>
      <div className='flex-1'>
        {children}
      </div>
    </main>
  )
}
