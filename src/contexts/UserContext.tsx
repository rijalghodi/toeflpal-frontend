'use client';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, ReactNode, useContext } from 'react';

import { userSelfGet, userSelfGetKey } from '@/services';

// Define the user data structure
interface UserCtx {
  user:
    | {
        id: string;
        email: string;
        roles: string[];
      }
    | undefined;
  loading: boolean;
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
  const { data, isLoading } = useQuery({
    queryKey: userSelfGetKey(),
    queryFn: userSelfGet,
    retry: false,
  });

  return (
    <UserContext.Provider value={{ user: data?.data, loading: isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
