import type { FC, ReactNode } from 'react';
import { AuthContext } from './auth.context';
import { useLocalStorage } from 'react-use';
import type { TRegisteredUser } from '@/shared/types/registered-user';

interface IProps {
  children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<TRegisteredUser[]>('user', []);
  const [user = null, setUser] = useLocalStorage<TRegisteredUser | null>(
    'currentUser',
    null
  );
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
    setUser(user);
    return user;
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ registerUser, loginUser, user, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
