'use client';

import { Box, Center, Text } from '@mantine/core';
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
        <Box
          mx="auto"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(text ?? ''),
          }}
        />
      </Box>
    );
  }

  return (
    <Center h="calc(100vh - 150px)" maw={700} mx="auto">
      <Text>No instruction provided. Click Next.</Text>
    </Center>
  );
}
