'use client';

import { CloseButton, Paper, Portal, Stack } from '@mantine/core';
import React, { createContext, useContext, useRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';

type AudioPlayerProps = {
  size?: number;
  src: string;
  title?: React.ReactNode;
};

type OpenProps = AudioPlayerProps;

interface AudioPlayerContextType {
  opened: boolean;
  open: (props: OpenProps) => void;
  close: () => void;
}

// Create the context
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined,
);

// Create a provider component
export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [opened, setOpened] = useState(false);
  const [audioPlayerProps, setAudioPlayerProps] = useState<AudioPlayerProps>();

  const open = ({ ...audioPlayerProps }: OpenProps) => {
    setOpened(true);
    setAudioPlayerProps(audioPlayerProps);
  };

  const close = () => setOpened(false);

  const audioRef = useRef<null | AudioPlayer>(null);

  return (
    <AudioPlayerContext.Provider value={{ opened, open, close }}>
      {children}
      <Portal>
        <Paper
          pos="fixed"
          bottom={{ base: 1, sm: 12 }}
          left="50%"
          miw={300}
          maw={600}
          w="100%"
          withBorder
          shadow="sm"
          style={{
            transform: 'translateX(-50%)',
            display: opened ? 'block' : 'none',
            zIndex: 10000,
          }}
          p="sm"
        >
          <CloseButton
            pos="absolute"
            right={12}
            top={12}
            onClick={() => {
              close();
              audioRef.current?.audio.current?.pause();
            }}
          />
          <Stack mx="auto" align="center" gap={8}>
            <AudioPlayer
              {...audioPlayerProps}
              header={audioPlayerProps?.title}
              showDownloadProgress
              preload="metadata"
              ref={audioRef}
              showJumpControls={false}
              showSkipControls={false}
              style={{
                border: 'none !important',
                borderWidth: 0,
                borderRadius: 8,
                boxShadow: 'none',
              }}
            />
          </Stack>
        </Paper>
      </Portal>
    </AudioPlayerContext.Provider>
  );
};

// Custom hook to use the audioPlayer context
export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within a AudioPlayerProvider');
  }
  return context;
};
