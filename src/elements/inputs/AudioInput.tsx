import {
  ActionIcon,
  Divider,
  FileButton,
  Group,
  Input,
  InputWrapperProps,
  Paper,
} from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import React, { useState } from 'react';

import { AudioPlayer } from '../displays';

type Props = {
  defaultUrl?: string;
  placeholder?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
} & InputWrapperProps;
export function AudioInput({
  defaultUrl,
  value,
  size = 'sm',
  onChange,
  ...inputProps
}: Props) {
  const valueUrl = value ? URL.createObjectURL(value) : null;

  const [audioUrl, setAudioUrl] = useState(valueUrl ?? defaultUrl);

  const handleChangeAudio = (file: File | null) => {
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudioUrl(audioUrl);
      onChange(file);
      return;
    }
    setAudioUrl(valueUrl ?? defaultUrl);
    onChange(value ?? null);
  };

  return (
    <Input.Wrapper size={size} {...inputProps}>
      <Paper p={4} withBorder>
        <Group gap="xs">
          <AudioPlayer src={audioUrl ?? ''} flex={1} withTimer={false} />
          <Divider orientation="vertical" />
          <FileButton onChange={handleChangeAudio} accept="audio/*">
            {(props) => (
              <ActionIcon
                {...props}
                variant="subtle"
                color="dark"
                title="Upload"
                size="md"
              >
                <IconUpload size={16} />
              </ActionIcon>
            )}
          </FileButton>
        </Group>
      </Paper>
    </Input.Wrapper>
  );
}
