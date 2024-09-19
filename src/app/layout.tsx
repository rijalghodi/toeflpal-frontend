import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/global.css';

import { ColorSchemeScript } from '@mantine/core';
import { Inter } from 'next/font/google';
import React from 'react';

import { DrawerProvider } from '@/contexts';
import { MantineProviders } from '@/elements/providers/MantineProvider';
import { ClientProviders } from '@/features/ClientProviders';

const font = Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

const headingFont = Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'TOEFL PAL - Real TOEFL Simulation',
  description: 'TOEFL PAL is a reliable TOEFL simulation platform',
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
          <MantineProviders
            fontFamily={font.style.fontFamily}
            headingFontFamily={headingFont.style.fontFamily}
          >
            <DrawerProvider>{children}</DrawerProvider>
          </MantineProviders>
        </ClientProviders>
      </body>
    </html>
  );
}
