import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './authContext';

export const PrivateRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); 

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};