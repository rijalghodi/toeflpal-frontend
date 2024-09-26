import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-datatable/styles.layer.css';
import './layout.css';
import 'react-h5-audio-player/lib/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import { Inter } from 'next/font/google';
import React from 'react';

import {
  AudioPlayerProvider,
  DrawerAlt2Provider,
  DrawerAltProvider,
  DrawerProvider,
} from '@/contexts';
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
        <link rel="shortcut icon" href="/favicon.ico" />
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
            <AudioPlayerProvider>
              <DrawerAlt2Provider>
                <DrawerAltProvider>
                  <DrawerProvider>{children}</DrawerProvider>
                </DrawerAltProvider>
              </DrawerAlt2Provider>
            </AudioPlayerProvider>
          </MantineProviders>
        </ClientProviders>
      </body>
    </html>
  );
}
