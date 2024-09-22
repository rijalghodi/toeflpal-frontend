'use client';

import { Drawer, DrawerProps, Portal } from '@mantine/core';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type OpenProps = {
  content?: ReactNode;
} & Omit<DrawerProps, 'opened' | 'onClose' | 'content'>;

interface DrawerContextType {
  opened: boolean;
  open: (props: OpenProps) => void;
  close: () => void;
  content: ReactNode;
}

// Create the context
const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

// Create a provider component
export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [opened, setOpened] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [drawerProps, setDrawerProps] =
    useState<Omit<DrawerProps, 'opened' | 'onClose'>>();

  const open = ({ content: newContet, ...drawerProps }: OpenProps) => {
    setContent(newContet || null);
    setOpened(true);
    setDrawerProps(drawerProps);
  };

  const close = () => setOpened(false);

  return (
    <DrawerContext.Provider value={{ opened, open, close, content }}>
      {children}
      <Portal>
        <Drawer
          opened={opened}
          onClose={close}
          size="md"
          position="right"
          overlayProps={{
            opacity: 0.2,
          }}
          styles={{
            title: {
              fontWeight: 700,
              fontSize: 12,
              textTransform: 'uppercase',
            },
          }}
          {...drawerProps}
        >
          {content}
        </Drawer>
      </Portal>
    </DrawerContext.Provider>
  );
};

// Custom hook to use the drawer context
export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
