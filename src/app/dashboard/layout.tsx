import React from 'react'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-slate-100 justify-center'>
      {children}
    </div>
  )
}
