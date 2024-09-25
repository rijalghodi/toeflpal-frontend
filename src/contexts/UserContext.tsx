'use client';
import { useQuery } from '@tanstack/react-query';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { userSelfGet, userSelfGetKey } from '@/services';

// Define the user data structure
type User = {
  id: string;
  email: string;
  roles: string[];
};

// Define the context structure
interface UserCtx {
  user: User | undefined;
  loading: boolean;
  refetchUser: () => void;
  logout: () => void;
}

// Create the UserContext
const UserContext = createContext<UserCtx | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Define the provider's props
interface UserProviderProps {
  children: ReactNode;
}

// Create the UserProvider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  // Fetch user data
  const { data, isLoading, refetch } = useQuery({
    queryKey: userSelfGetKey(),
    queryFn: userSelfGet,
    retry: false,
  });

  useEffect(() => {
    setUser(data?.data);
  }, [data]);
  // Logout function to clear user data
  const logout = () => {
    setUser(undefined); // Clear the user data
  };

  return (
    <UserContext.Provider
      value={{ user, loading: isLoading, refetchUser: refetch, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
