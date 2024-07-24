/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { Auth } from '@/interfaces/auth';

type Props = {
  children: ReactNode;
};

type ContextType = {
  user?: Auth;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<any>> | ((value: any) => void);
  logout: () => void;
};

const defaultValue: ContextType = {
  isLoading: false,
  setUser: (value: any) => null,
  logout: () => null,
};

const AuthContext = createContext<ContextType>(defaultValue);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Auth | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = localStorage.getItem('user');
    const _user = getUser ? JSON.parse(getUser) : null;
    if (getUser) {
      setUser(_user);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    setUser(undefined);

    localStorage.clear();
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user) || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
