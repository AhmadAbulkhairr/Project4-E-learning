import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

const PrivateRoute = ({ children, role: requiredRole }) => {
  const { token, role } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (!(requiredRole && requiredRole.includes(role)) ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
