"use client"
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Prepare from '../pages/Prepare'
import Start from '../pages/Start'

function Presentation() {
  console.log(location.href)
  return (
    
    <BrowserRouter basename='/presentation'>
      <Routes>
        <Route path='/prepare' element={<Prepare/>}/>
        <Route path='/start' element={<Start/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Presentation
