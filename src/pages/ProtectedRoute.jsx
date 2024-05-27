import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    console.log("user not found");
    return <Navigate to='/login' />;
  }
  return children;
};
export default ProtectedRoute;