import {
  Button,
  Group,
  Input,
  InputWrapperProps,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import DOMPurify from 'dompurify';
import React from 'react';

import { useDrawerAlt } from '@/contexts';

import { RichTextEditor } from './RichTextEditor';

type Props = {
  value?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  ref?: any;
} & InputWrapperProps;

export function RichTextEditorInput({
  value,
  onChange,
  placeholder,
  size = 'sm',
  ref,
  ...props
}: Props) {
  const { open, close } = useDrawerAlt();
  const firstContent = new DOMParser()
    .parseFromString(DOMPurify.sanitize(value || ''), 'text/html')
    .body.textContent?.trim();

  const handleOpenDrawerEditor = () => {
    open({
      title: props.label,
      size: 'lg',
      zIndex: 1000,
      content: (
        <Stack>
          <RichTextEditor initialContent={value} onContentChange={onChange} />
          <Paper
            withBorder
            pos="absolute"
            bottom={0}
            left={0}
            right={0}
            radius={0}
            p="xs"
          >
            <Group justify="flex-end" w="100%">
              <Button onClick={() => close()}>Apply</Button>
            </Group>
          </Paper>
        </Stack>
      ),
    });
  };

  return (
    <Input.Wrapper size={size} {...props}>
      <Input
        component="button"
        type="button"
        pointer
        onClick={handleOpenDrawerEditor}
        styles={{
          input: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }}
        ref={ref}
      >
        {firstContent ? (
          firstContent.slice(0, 100)
        ) : (
          <Text c="var(--mantine-color-placeholder)" fz={size}>
            {placeholder}
          </Text>
        )}
      </Input>
    </Input.Wrapper>
  );
}
