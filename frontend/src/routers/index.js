import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Home from '../pages/Home/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Grades from '../pages/Grades';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '', element: <Home /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'grades', element: <Grades /> },
    ],
  },
]);
