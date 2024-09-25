'use client';

import { Box, Center, Stack, Text } from '@mantine/core';
import DOMPurify from 'dompurify';
import React from 'react';

// import { FormEditorMain } from './FormEditorMain';

type Props = {
  text?: string;
};

export function PartPanel({ text }: Props) {
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
    <Box maw={800} w="100%" mx="auto">
      <Center h="calc(100vh - 150px)" maw={700} mx="auto">
        <Stack>
          <Text>No part direction provided. Click Next.</Text>
        </Stack>
      </Center>
    </Box>
  );
}
