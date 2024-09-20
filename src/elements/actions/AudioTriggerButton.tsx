import { Button, ButtonProps } from '@mantine/core';
import { IconHeadphones } from '@tabler/icons-react';
import React from 'react';

import { useAudioPlayer } from '@/contexts';

type Props = ButtonProps & {
  src?: string;
  title?: string;
};
export function AudioTriggerButton({
  size = 'xs',
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
      onClick={handleOpenAudio}
      leftSection={<IconHeadphones size={16} />}
      disabled={!src || disabled}
      {...btnProps}
    >
      Play
    </Button>
  );
}
