'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProgressBar } from 'next-nprogress-bar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
export function ClientProviders({ children }: Props) {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 1, // 1 minutes
      },
      mutations: {},
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      <AppProgressBar
        height="3px"
        color="#5c7cfa"
        options={{ showSpinner: false }}
        shallowRouting
      />

      {children}
    </QueryClientProvider>
  );
}
