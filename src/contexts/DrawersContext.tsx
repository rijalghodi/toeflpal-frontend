'use client';

import { Drawer, DrawerProps } from '@mantine/core';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the type for each drawer's state
type OpenProps = {
  content?: ReactNode;
  id?: string;
} & Omit<DrawerProps, 'opened' | 'onClose' | 'content'>;

type DrawersState = {
  id: string;
  content: ReactNode;
  drawerProps: Omit<DrawerProps, 'opened' | 'onClose'>;
  opened: boolean;
};

interface DrawersContextType {
  open: (props: OpenProps) => string; // Open returns an ID
  close: (id: string) => void;
  closeAll: () => void;
  drawers: DrawersState[];
}

// Create the context
const DrawersContext = createContext<DrawersContextType | undefined>(undefined);

// Generate a random ID if one is not provided
const generateId = () => Math.random().toString(36).substr(2, 9);

// Create a provider component
export const DrawersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [drawers, setDrawerss] = useState<DrawersState[]>([]);

  // Open a drawer, return the id of the opened drawer
  const open = ({ id, content, ...drawerProps }: OpenProps): string => {
    const drawerId = id || generateId(); // Use provided id or generate a new one
    setDrawerss((prev) =>
      prev.some((drawer) => drawer.id === drawerId)
        ? prev.map((drawer) =>
            drawer.id === drawerId
              ? { ...drawer, opened: true, content, drawerProps }
              : drawer,
          )
        : [
            ...prev,
            {
              id: drawerId,
              opened: true,
              content: content || null,
              drawerProps,
            },
          ],
    );
    return drawerId; // Return the assigned or provided id
  };

  // Close a specific drawer by ID
  const close = (id: string) => {
    setDrawerss((prev) =>
      prev.map((drawer) =>
        drawer.id === id ? { ...drawer, opened: false } : drawer,
      ),
    );
  };

  // Close all drawers
  const closeAll = () =>
    setDrawerss((prev) => prev.map((drawer) => ({ ...drawer, opened: false })));

  return (
    <DrawersContext.Provider value={{ open, close, closeAll, drawers }}>
      {children}

      {drawers.map(({ id, opened, content, drawerProps }) => (
        <Drawer
          key={id}
          opened={opened}
          onClose={() => close(id)}
          size="md"
          position="right"
          overlayProps={{
            opacity: 0.2,
          }}
          styles={{
            title: {
              fontWeight: 700,
              fontSize: 14,
              textTransform: 'uppercase',
            },
          }}
          transitionProps={{
            duration: 1000,
            timingFunction: 'ease',
          }}
          {...drawerProps}
        >
          {content}
        </Drawer>
      ))}
    </DrawersContext.Provider>
  );
};

// Custom hook to use the drawer context
export const useDrawers = () => {
  const context = useContext(DrawersContext);
  if (context === undefined) {
    throw new Error('useDrawers must be used within a DrawersProvider');
  }
  return context;
};
