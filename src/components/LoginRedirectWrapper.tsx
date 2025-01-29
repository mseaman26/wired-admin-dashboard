// components/LoginRedirectWrapper.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginRedirectWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  // If user is authenticated, redirect to the home page
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

export default LoginRedirectWrapper;
