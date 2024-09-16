import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/global.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import React from 'react';

import { ClientProviders } from '@/features/ClientProviders';

import { theme } from '../../theme';

const font = Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const titleFont = Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Toefl Pal - Real TOEFL Simulation',
  description: 'Toefl Pal is a reliable TOEFL simulation platform',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
      // className={`${titleFont.className} ${font.className}`}
      >
        <ClientProviders>
          <MantineProvider
            theme={{
              ...theme,
              fontFamily: font.style.fontFamily,
              headings: {
                ...theme?.headings,
                fontFamily: titleFont.style.fontFamily,
              },
            }}
          >
            <Notifications position="top-center" autoClose={5000} />
            <ModalsProvider
              // modals={{
              //   context: ContextModal,
              // }}
              modalProps={{
                centered: true,
              }}
            >
              {children}
            </ModalsProvider>
          </MantineProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
