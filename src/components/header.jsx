import React from 'react'
import LOGO from "../assets/LGO.png"

function Header() {
  return (
    <div className='h-[50px] w-full absolut bg-gray-900  '>
        <img src={LOGO} className='h-[60px] w-[100px]  relative left-7 bg-transparent'  />
        <h1 className='absolute text-2xl text-white left-[8%] top-5 font-sans '>Videotube</h1>

    
      
    </div>
  )
}

export default Header
