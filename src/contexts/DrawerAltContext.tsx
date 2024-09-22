'use client';

import { Drawer, DrawerProps } from '@mantine/core';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type DrawerAltProps = {
  content?: ReactNode;
  onClose?: () => void;
} & Omit<DrawerProps, 'opened' | 'onClose' | 'content'>;

interface DrawerAltContextType {
  opened: boolean;
  open: (props: DrawerAltProps) => void;
  close: () => void;
  content: ReactNode;
}

// Create the context
const DrawerAltContext = createContext<DrawerAltContextType | undefined>(
  undefined,
);

// Create a provider component
export const DrawerAltProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [drawerAltProps, setDrawerAltProps] =
    useState<Omit<DrawerAltProps, 'content'>>();

  const open = ({ content: newContet, ...drawerProps }: DrawerAltProps) => {
    setContent(newContet || null);
    setOpened(true);
    setDrawerAltProps(drawerProps);
  };

  const close = () => setOpened(false);

  return (
    <DrawerAltContext.Provider value={{ opened, open, close, content }}>
      {children}
      <Drawer
        opened={opened}
        size="md"
        position="right"
        overlayProps={{
          opacity: 0.4,
          color: 'white',
          bg: 'white',
        }}
        zIndex={200}
        styles={{
          title: {
            fontWeight: 700,
            fontSize: 12,
            textTransform: 'uppercase',
          },
        }}
        {...drawerAltProps}
        onClose={() => {
          drawerAltProps?.onClose?.();
          close();
        }}
      >
        {content}
      </Drawer>
    </DrawerAltContext.Provider>
  );
};

// Custom hook to use the drawer context
export const useDrawerAlt = () => {
  const context = useContext(DrawerAltContext);
  if (context === undefined) {
    throw new Error('useDrawerAlt must be used within a DrawerAltProvider');
  }
  return context;
};
