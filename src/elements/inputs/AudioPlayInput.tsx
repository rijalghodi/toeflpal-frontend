import {
  ActionIcon,
  FileInput,
  FileInputProps,
  Group,
  Pill,
} from '@mantine/core';
import { IconHeadphones } from '@tabler/icons-react';
import React from 'react';

import { useAudioPlayer } from '@/contexts';

type Props = {
  defaultUrl?: string;
  placeholder?: string;
} & FileInputProps;
export function AudioPlayInput({
  defaultUrl,
  value,
  size = 'sm',
  ...fileInpProps
}: Props) {
  const { open } = useAudioPlayer();

  const handleOpenAudio = () => {
    const defaultAudioUrl = defaultUrl ?? '';
    const audioUrl = value ? URL.createObjectURL(value) : null;
    open({
      title: fileInpProps.label,
      src: audioUrl ?? defaultAudioUrl,
    });
  };

  return (
    <Group gap="xs" align="flex-end">
      <FileInput
        size={size}
        value={value}
        valueComponent={ValueComponent}
        flex={1}
        accept="audio/*"
        {...fileInpProps}
      />
      {(value || defaultUrl) && (
        <ActionIcon
          size="md"
          onClick={handleOpenAudio}
          color="dark"
          variant="subtle"
        >
          <IconHeadphones size={16} />
        </ActionIcon>
      )}
    </Group>
  );
}

const ValueComponent: FileInputProps['valueComponent'] = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={index}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};
