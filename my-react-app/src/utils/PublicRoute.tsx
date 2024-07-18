import { Navigate } from 'react-router-dom';
import React from 'react';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return !localStorage.getItem('accessToken') ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
