"use client"
import React from 'react'
import { userStore } from '$/lib/user'

function UserAvatar() {
  const {user} = userStore(state=>({user: state.user})) 
  return (
    <div className='flex items-center'>
      {
        user ?
          <>
            {
              user.photoURL ?
                <img src={user.photoURL} className='w-[5em] h-[5em] rounded-full' alt="" />
                : 
                <div className='w-[5em] h-[5em] rounded-full bg-logo'></div> 
            }
            <div>
              <h1 className='font-bold'>{user.displayName}</h1>
            </div>
          </>
        :<></>
      }
    </div>
  )
}

export default UserAvatar
