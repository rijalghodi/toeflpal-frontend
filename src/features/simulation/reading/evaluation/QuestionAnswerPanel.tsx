'use client';

import {
  Box,
  Button,
  CheckIcon,
  Flex,
  Group,
  Paper,
  Radio,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { IconAlignJustified } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import React from 'react';

import { useDrawer } from '@/contexts';

// import { FormEditorMain } from './FormEditorMain';

type Props = {
  question: string;
  reference?: string;
  options?: { order: number; text?: string }[];
  value?: number;
  correctAnswerOrder?: number;
  explanation?: string;
};

export function QuestionAnswerPanel({
  question,
  reference,
  options,
  ...props
}: Props) {
  const { open: openDrawer } = useDrawer();

  function numberToLetter(num?: number): string | undefined {
    if (num === undefined) return 'No Answer';
    const letters = ['A', 'B', 'C', 'D', 'E'];
    return letters[num - 1];
  }

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: 'lg', sm: 'xl' }}
      w="100%"
      justify="center"
    >
      {reference && (
        <Box maw={800} w="100%" visibleFrom="md">
          <ScrollArea.Autosize
            mah="calc(100vh - 80px)"
            offsetScrollbars
            scrollbarSize={5}
            type="auto"
          >
            <Box
              px="md"
              py="md"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(reference ?? ''),
              }}
            />
          </ScrollArea.Autosize>
        </Box>
      )}
      <Stack gap="md" maw={800} w="100%" py="lg">
        {reference && (
          <Group justify="flex-end" hiddenFrom="md">
            <Button
              variant="default"
              size="xs"
              leftSection={<IconAlignJustified size={16} />}
              onClick={() => {
                openDrawer({
                  title: 'Reference',
                  size: '100vw',
                  content: (
                    <Box
                      w="100%"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(reference ?? ''),
                      }}
                    />
                  ),
                });
              }}
            >
              Reference
            </Button>
          </Group>
        )}
        <Box
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(question ?? ''),
          }}
        />

        <Stack gap="md">
          {options?.map((opt, idx) => (
            <Radio
              readOnly
              key={idx}
              label={opt.text}
              value={opt.order}
              checked={
                opt.order === props.correctAnswerOrder ||
                opt.order === props.value
              }
              color={
                opt.order === props.correctAnswerOrder &&
                props.value === props.correctAnswerOrder
                  ? 'green'
                  : opt.order === props.correctAnswerOrder
                    ? 'green' // fixme:
                    : 'red'
              }
              icon={
                opt.order === props.correctAnswerOrder ? CheckIcon : undefined
              }
              size="md"
            />
          ))}
        </Stack>
        <Paper bg="gray.1" p="sm" mt="lg">
          <Text fz="xs" tt="uppercase" fw={600} mb="md">
            Explanation
          </Text>
          <Text fw={600}>Your answer is: {numberToLetter(props.value)}</Text>
          <Text fw={600}>
            Correct Answer is: {numberToLetter(props.correctAnswerOrder)}
          </Text>
          <Box
            mt="md"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.explanation ?? ''),
            }}
          />
        </Paper>
      </Stack>
    </Flex>
  );
}
