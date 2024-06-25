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
import Teacher from '../pages/Teacher';

import PrivateRoute from '../components/PrivateRoute'; 
import Subjects from '../pages/Subjects'
import Teachers from '../pages/Teachers';
import Materials from '../pages/Materials';
import Contact from '../pages/Contact';
import Courses from '../pages/Courses';
import Course from '../pages/Course';
import Chat from '../pages/Chat';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '', element: <Home /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'grades', element: <Grades /> },
      { path: 'grades/:id/subjects', element: <Subjects /> },
      { path: 'subjects/:id/teachers', element: <Teacher /> },
      { path: 'teachers/:id/materials', element: <Materials /> },
      { path: 'contact', element: <Contact /> },
      { path: 'teachers', element: <Teachers /> },
      { path: 'all-courses', element: <Courses /> },
      { path: 'all-courses/:id', element: <Course /> },
      { path: 'chat', element: (
        <PrivateRoute role ={["Admin",'Teacher', "Student"]} >
<Chat />        
</PrivateRoute>
      )
      },

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
