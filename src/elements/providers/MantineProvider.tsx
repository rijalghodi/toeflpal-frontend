'use client';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import React from 'react';

import { theme } from '../../../theme';

type Props = {
  fontFamily?: string;
  headingFontFamily?: string;
  children: React.ReactNode;
};
export function MantineProviders({
  fontFamily,
  headingFontFamily,
  children,
}: Props) {
  return (
    <MantineProvider
      theme={{
        ...theme,
        fontFamily: fontFamily,
        headings: {
          ...theme?.headings,
          fontFamily: headingFontFamily,
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
  );
}
