import type { TRegisteredUser } from '@/shared/types/registered-user';
import { createContext, useContext } from 'react';

interface IAuthContext {
  registerUser: (login: string, password: string) => void;
  loginUser: (login: string, password: string) => TRegisteredUser;
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
