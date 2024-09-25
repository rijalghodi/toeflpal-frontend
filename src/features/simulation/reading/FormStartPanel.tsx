'use client';

import { Box, Center, ScrollArea, Text } from '@mantine/core';
import DOMPurify from 'dompurify';
import React from 'react';

// import { FormEditorMain } from './FormEditorMain';

type Props = {
  text?: string;
  onStart?: () => void;
};

export function FormStartPanel({ text }: Props) {
  if (text) {
    return (
      <Box maw={800} w="100%" mx="auto">
        <ScrollArea.Autosize
          mah="calc(100vh - 80px)"
          offsetScrollbars
          scrollbarSize={5}
          py="md"
        >
          <Box
            mx="auto"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(text ?? ''),
            }}
          />
        </ScrollArea.Autosize>
      </Box>
    );
  }

  return (
    <Center h="calc(100vh - 150px)" maw={700} mx="auto">
      <Text>No instruction provided. Click Next.</Text>
    </Center>
  );
}
