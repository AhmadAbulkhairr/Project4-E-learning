import React from 'react'
import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';

import {createContext,useState, useEffect } from 'react'
import "@fontsource/roboto";
import "./App.css";
import {RouterProvider} from "react-router-dom"
import { router } from './routers/index';
export const UserContext = createContext();
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [role, setRole] = useState(localStorage.getItem('role') || "");
  const [user, setUser] = useState(localStorage.getItem('user') || "");
  const [userId, setUserId] = useState(localStorage.getItem('id') || "");

useEffect(() => {
  const storedId = localStorage.getItem('id');

  const storedUser = localStorage.getItem('user');

  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');
  if (storedToken) setToken(storedToken);
  if (storedUser) setUser(storedUser);
if (storedId) setUserId (storedId)
  if (storedRole) setRole(storedRole);
}, []);

  return ( 
  
  <>
        <Elements stripe={stripePromise}>

 <UserContext.Provider value={{role,setRole,setToken,token,user,setUser,userId,setUserId}}>

  <RouterProvider router={router}/>

  </UserContext.Provider>
</Elements>
  </>

  )
}

export default App
