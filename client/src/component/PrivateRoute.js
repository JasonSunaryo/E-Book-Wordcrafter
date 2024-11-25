import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  // Check both Google Auth and SQL Auth for admin role
  const googleRole = localStorage.getItem('userRole');
  const sqlRole = Cookies.get('user_role');
  
  // User is admin if either auth method indicates admin role
  const isAdmin = googleRole === 'admin' || sqlRole === 'admin';
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default PrivateRoute;