import {
  ActionIcon,
  Button,
  Group,
  Input,
  InputWrapperProps,
  Paper,
  Stack,
} from '@mantine/core';
import { IconArrowsMaximize } from '@tabler/icons-react';
import React, { useState } from 'react';

import { useDrawerAlt2 } from '@/contexts';

import { RichTextEditor } from './RichTextEditor';

type Props = {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
} & InputWrapperProps;

export function RichTextEditorInput({
  value,
  onChange,
  size = 'sm',
  ...props
}: Props) {
  const { open, close } = useDrawerAlt2();
  const [version, setVersion] = useState(0);
  // const firstContent = new DOMParser()
  //   .parseFromString(DOMPurify.sanitize(value || ''), 'text/html')
  //   .body.textContent?.trim();

  const handleOpenDrawerEditor = () => {
    open({
      title: props.label,
      size: 'xl',
      zIndex: 1000,
      onClose: () => setVersion((v) => v + 1),
      content: (
        <Stack>
          <RichTextEditor
            initialContent={value}
            onContentChange={onChange}
            mah="calc(100vh - 166px)"
          />
          <Paper
            withBorder
            pos="absolute"
            bottom={0}
            left={0}
            right={0}
            radius={0}
            p="xs"
            py={4}
          >
            <Group justify="flex-end" w="100%">
              <Button
                onClick={() => {
                  close();
                  setVersion((v) => v + 1);
                }}
              >
                Apply
              </Button>
            </Group>
          </Paper>
        </Stack>
      ),
    });
  };

  return (
    <Input.Wrapper
      size={size}
      {...props}
      label={
        <Group gap="xs">
          {props.label}
          <ActionIcon
            size="sm"
            variant="subtle"
            color="dark"
            onClick={handleOpenDrawerEditor}
            title="Expand"
          >
            <IconArrowsMaximize size={14} />
          </ActionIcon>
        </Group>
      }
    >
      <RichTextEditor
        initialContent={value}
        onContentChange={onChange}
        mah={200}
        minimalist
        version={version}
      />
    </Input.Wrapper>
  );
}

{
  /* <Input
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
      </Input> */
}
