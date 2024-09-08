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
      },
      mutations: {},
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      <AppProgressBar
        height="3px"
        color="#1c7ed6"
        options={{ showSpinner: false }}
        shallowRouting
      />

      {children}
    </QueryClientProvider>
  );
}
