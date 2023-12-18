import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UserAvatar from './UserAvatar'

import logo from "$/assets/prestoo.png"

function Appbar() {
  return (
    <nav className='w-full py-2 px-8 border-b shadow flex flex-row justify-between'>
      <Link href="/" className='flex flex-row items-center'>
        <Image width={80} src={logo} alt='logo for prestoo'/>
        <h1 className='text-4xl text-logo font-sans font-extrabold'>Presto</h1>
      </Link>

      <UserAvatar/>
    </nav>
  )
}

export default Appbar
