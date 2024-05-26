import React from 'react'
import SideBar from '../ui/dashboard/sideBar/SideBar'
import NavBar from '../ui/dashboard/navBar/NavBar'

const layout = ({children}) => {
  return (
    <div className='   w-full h-screen'>
        <div className='w-full flex h-full'>
        <div className=' w-[19%]  '>
        <SideBar/>
      </div>
      <div className=' flex-1 px-4  bg-gray-100 h-screen '>
        <NavBar/>
        {children}
      </div>
        </div>
     
    </div>
  )
}

export default layout
