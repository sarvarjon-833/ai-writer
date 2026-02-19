import { createContext, useContext } from 'react';

interface IAuthContext {
  register: (login: string, password: string) => void;
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
