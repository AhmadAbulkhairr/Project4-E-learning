import {createBrowserRouter} from "react-router-dom"
import Main from "../layouts/Main"
import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"

export const router = createBrowserRouter ([
    {
      path: '/',
      element: <Main />,
      children: [
        { path: '', element: <Home /> }
      
      ,{
        path:"login",element:<SignIn/>
      },
      {path:"signup",element:<SignUp/>
    }
    ]

    }
  ,
  
  ])