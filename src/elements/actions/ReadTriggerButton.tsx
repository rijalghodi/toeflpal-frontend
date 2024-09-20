import { Button, ButtonProps } from '@mantine/core';
import { IconHeadphones } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import React from 'react';

import { useDrawer } from '@/contexts';

type Props = ButtonProps & {
  content?: string;
  title?: string;
};
export function ReadTriggerButton({
  size = 'xs',
  content,
  title,
  disabled,
  ...btnProps
}: Props) {
  const { open } = useDrawer();
  const handleOpenRead = () => {
    if (content) {
      const safeHtml = DOMPurify.sanitize(content);
      open({
        title,
        content: (
          <div
            dangerouslySetInnerHTML={{
              __html: safeHtml,
            }}
          />
        ),
      });
    }
  };

  return (
    <Button
      size={size}
      onClick={handleOpenRead}
      leftSection={<IconHeadphones size={16} />}
      disabled={!content || disabled}
      {...btnProps}
    >
      Play
    </Button>
  );
}
