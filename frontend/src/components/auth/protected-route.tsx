import { useAuthContext } from '@/context/auth.context';
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
