import type { FC, ReactNode } from 'react';
import { AuthContext } from './auth.context';
import { useLocalStorage } from 'react-use';
import type { RegisteredUser } from '@/shared/types/registered-user';

interface IProps {
  children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<RegisteredUser[]>('user', []);
  const register = (login: string, password: string) => {
    if (users) {
      setUsers([...users, { login, password, createdAt: new Date() }]);
    }
  };
  return (
    <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
