import React from 'react'
import {createContext,useState, useEffect } from 'react'
import "@fontsource/roboto";
import "./App.css";
import {RouterProvider} from "react-router-dom"
import { router } from './routers/index';
export const UserContext = createContext();

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [role, setRole] = useState(localStorage.getItem('role') || "");
  const [user, setUser] = useState(localStorage.getItem('role') || "");

useEffect(() => {
  const storedUser = localStorage.getItem('user');

  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');
  if (storedToken) setToken(storedToken);
  if (storedUser) setToken(storedToken);

  if (storedRole) setRole(storedRole);
}, []);

  return ( 
  
  <>
 <UserContext.Provider value={{role,setRole,setToken,token,user,setUser}}>

  <RouterProvider router={router}/>

  </UserContext.Provider>

  </>

  )
}

export default App
