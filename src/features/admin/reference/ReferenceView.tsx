import {
  Box,
  InputWrapper,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import DOMPurify from 'dompurify';
import React from 'react';

import { AudioPlayer } from '@/elements';

type Props = {
  initValues?: {
    name?: string;
    text?: string;
    audioUrl?: string;
  };
};
export function ReferenceView({ initValues }: Props) {
  const safeHtml = initValues?.text ? DOMPurify.sanitize(initValues?.text) : '';

  return (
    <Stack>
      <Text fz="md" tt="uppercase" fw={600}>
        {initValues?.name}
      </Text>
      <InputWrapper label="Reference Text">
        <Paper withBorder>
          <ScrollArea.Autosize
            mah="calc(100vh - 250px)"
            p="sm"
            scrollbarSize={4}
          >
            {safeHtml ? (
              <Box
                dangerouslySetInnerHTML={{
                  __html: safeHtml,
                }}
              />
            ) : (
              <Text>-</Text>
            )}
          </ScrollArea.Autosize>
        </Paper>
      </InputWrapper>
      <InputWrapper label="Reference Audio">
        <AudioPlayer src={initValues?.audioUrl} />
      </InputWrapper>
    </Stack>
  );
}
