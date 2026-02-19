import type { FC, ReactNode } from 'react';
import { AuthContext } from './auth.context';
import { useLocalStorage } from 'react-use';
import type { RegisteredUser } from '@/shared/types/registered-user';

interface IProps {
  children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<RegisteredUser[]>('user', []);
  const registerUser = (login: string, password: string) => {
    if (users) {
      setUsers([...users, { login, password, createdAt: new Date() }]);
    }
  };

  const loginUser = (login: string, password: string) => {
    const user = users?.find((user) => user.login === login);
    if (!user) {
      throw new Error('user not found');
    }
    if (user.password !== password) {
      throw new Error('password does not match');
    }
    return user;
  };

  return (
    <AuthContext.Provider value={{ registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
