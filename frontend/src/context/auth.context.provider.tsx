import { useEffect, useState, type FC, type ReactNode } from 'react';
import { AuthContext } from './auth.context';
import type { TRegisteredUser } from '@/shared/types/registered-user';
import axios from 'axios';

interface IProps {
  children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });
  const [user = null, setUser] = useState<TRegisteredUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          'http://localhost:5000/api/v1/users/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data.user);
        setIsAuthenticated(true);
      } catch (error: unknown) {
        if (axios.isAxiosError(error))
          console.log(error.response?.data?.message || error.message);

        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/users/signup',
        {
          name,
          email,
          password,
          passwordConfirm,
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        console.log(error.response?.data?.message || error.message);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/users/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('token', response.data.token);
      setUser(response.data.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        console.log(error.response?.data?.message || error.message);
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        registerUser,
        loginUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
