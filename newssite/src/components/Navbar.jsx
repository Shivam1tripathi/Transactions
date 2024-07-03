import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  //hi
 
  
  return (
    <div className='h-12 bg-slate-600 flex items-center justify-between pl-2 pr-2'>
      <div>
        <Link to={'/'} className='text-2xl font-bold text-white'>NEWSFIRST</Link>
      </div>
      <div className='w-1/5 flex justify-between'>
      <Link to={'/'} className='text-lg font-bold text-white'>Transctions</Link>
      <Link to={'/statistics'} className='text-lg font-bold text-white'>Statistics</Link>
      </div>

    </div>
  )
}

export default Navbar