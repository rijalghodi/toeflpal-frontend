'use client';

import {
  Box,
  Button,
  CheckIcon,
  Flex,
  Group,
  Radio,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { IconAlignJustified } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import React from 'react';
import { Controller } from 'react-hook-form';

import { useDrawer } from '@/contexts';

// import { FormEditorMain } from './FormEditorMain';

type Props = {
  question: string;
  reference?: string;
  options?: { id: string; text?: string }[];
  questionId: string;
  onChangeAnswer?: (value?: string) => void;
  value?: string;
  control: any;
};

export function QuestionPanel({
  question,
  reference,
  options,
  ...props
}: Props) {
  const { open: openDrawer } = useDrawer();

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
        <Controller
          name={props.questionId}
          control={props.control}
          render={({ field }) => (
            <Radio.Group {...field}>
              <Stack gap="md">
                {options?.map((opt, idx) => (
                  <Radio
                    key={idx}
                    label={opt.text}
                    value={opt.id}
                    icon={CheckIcon}
                    size="md"
                  />
                ))}
              </Stack>
            </Radio.Group>
          )}
        ></Controller>
      </Stack>
    </Flex>
  );
}
