import React, { useContext } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from '../pages/Home/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Grades from '../pages/Grades';
import AdminDashboard from '../pages/AdminDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import MyCourses from '../pages/MyCourses';
import PrivateRoute from '../components/PrivateRoute'; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '', element: <Home /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'grades', element: <Grades /> },
      { 
        path: 'admin-dashboard', 
        element: (
          <PrivateRoute role="Admin">
            <AdminDashboard />
          </PrivateRoute>
        )
      },
      { 
        path: 'teacher-dashboard', 
        element: (
          <PrivateRoute role="Teacher">
            <TeacherDashboard />
          </PrivateRoute>
        )
      },
      { 
        path: 'my-courses', 
        element: (
          <PrivateRoute role="Student">
            <MyCourses />
          </PrivateRoute>
        )
      },
    ],
  },
]);
