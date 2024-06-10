import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

const Main = () => {
  return (
<div>
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>  )
}

export default Main