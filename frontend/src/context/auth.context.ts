import type { TRegisteredUser } from '@/shared/types/registered-user';
import { createContext, useContext } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  registerUser: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  user: TRegisteredUser | null;
  logoutUser: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used whithin an AuthProvider');
  }
  return context;
};

export { useAuthContext };
