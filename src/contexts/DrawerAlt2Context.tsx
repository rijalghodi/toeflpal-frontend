'use client';

import { Drawer, DrawerProps } from '@mantine/core';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type DrawerAlt2Props = {
  content?: ReactNode;
  onClose?: () => void;
} & Omit<DrawerProps, 'opened' | 'onClose' | 'content'>;

interface DrawerAlt2ContextType {
  opened: boolean;
  open: (props: DrawerAlt2Props) => void;
  close: () => void;
  content: ReactNode;
}

// Create the context
const DrawerAlt2Context = createContext<DrawerAlt2ContextType | undefined>(
  undefined,
);

// Create a provider component
export const DrawerAlt2Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [drawerAltProps, setDrawerAlt2Props] =
    useState<Omit<DrawerAlt2Props, 'content'>>();

  const open = ({ content: newContet, ...drawerProps }: DrawerAlt2Props) => {
    setContent(newContet || null);
    setOpened(true);
    setDrawerAlt2Props(drawerProps);
  };

  const close = () => setOpened(false);

  return (
    <DrawerAlt2Context.Provider value={{ opened, open, close, content }}>
      {children}
      <Drawer
        opened={opened}
        size="md"
        position="right"
        overlayProps={{
          opacity: 0.1,
          bg: 'white',
          blur: 5,
        }}
        zIndex={260}
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
    </DrawerAlt2Context.Provider>
  );
};

// Custom hook to use the drawer context
export const useDrawerAlt2 = () => {
  const context = useContext(DrawerAlt2Context);
  if (context === undefined) {
    throw new Error('useDrawerAlt2 must be used within a DrawerAlt2Provider');
  }
  return context;
};
