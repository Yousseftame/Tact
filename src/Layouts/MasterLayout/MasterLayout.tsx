import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import NavigateTop from '@/components/shared/NavigateTop'
import ScrollToTop from '@/components/shared/ScrollToTop'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
      <NavigateTop/>
          <Navbar/>
          <Outlet />
      <Footer />
      <ScrollToTop/>
    </>
  )
}
