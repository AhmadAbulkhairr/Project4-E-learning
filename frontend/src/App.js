import React from 'react'
import {createContext,useState, useEffect } from 'react'

import "./App.css";
import {RouterProvider} from "react-router-dom"
import { router } from './routers/index';
export const UserContext = createContext();

const App = () => {

const [token, setToken] = useState("")
const [role, setRole] = useState("")

  return ( 
  
  <>
 <UserContext.Provider value={{role,setRole,setToken,token}}>

  <RouterProvider router={router}/>

  </UserContext.Provider>

  </>

  )
}

export default App
