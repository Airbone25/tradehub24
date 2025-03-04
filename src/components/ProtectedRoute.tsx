import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { UserType } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: UserType;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredUserType,
  redirectTo
}) => {
  const { isAuthenticated, userType, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectPath = redirectTo || "/login";
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to={`/${userType}/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
