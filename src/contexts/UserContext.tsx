'use client';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, ReactNode, useContext } from 'react';
import { create } from 'zustand';

import { userSelfGet, userSelfGetKey } from '@/services';

export type Profile = {
  email: string;
  id: string;
  roles: string[];
};

type UserStore = {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

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
