import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  userType?: 'homeowner' | 'professional';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, userType }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userType && user.profile?.user_type !== userType) {
    return <Navigate to={`/${user.profile?.user_type}`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;