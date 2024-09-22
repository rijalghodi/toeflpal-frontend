import { Button, ButtonProps } from '@mantine/core';
import { IconHeadphones } from '@tabler/icons-react';
import React from 'react';

import { useAudioPlayer } from '@/contexts';

type Props = ButtonProps & {
  src?: string;
  title?: string;
};
export function AudioTriggerButton({
  size = 'compact-xs',
  src,
  title,
  disabled,
  ...btnProps
}: Props) {
  const { open } = useAudioPlayer();
  const handleOpenAudio = () => {
    if (src) {
      open({
        src,
        title,
      });
    }
  };

  return (
    <Button
      size={size}
      onClick={(e) => {
        e.stopPropagation();
        handleOpenAudio();
      }}
      leftSection={<IconHeadphones size={12} />}
      disabled={!src || disabled}
      color="dark"
      variant="light"
      {...btnProps}
    >
      Play
    </Button>
  );
}
