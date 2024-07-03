import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
   <Navbar/>
    <main className='min-h-screen bg-blue-100'>
     {children}
    </main>
    <Footer/>
    </>
  )
}

export default Layout