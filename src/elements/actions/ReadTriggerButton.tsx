import { Button, ButtonProps } from '@mantine/core';
import { IconFile } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import React from 'react';

import { useDrawerAlt } from '@/contexts';

type Props = ButtonProps & {
  content?: string;
  title?: string;
};
export function ReadTriggerButton({
  size = 'compact-xs',
  content,
  title,
  disabled,
  ...btnProps
}: Props) {
  const { open } = useDrawerAlt();
  const handleOpenRead = () => {
    if (content) {
      const safeHtml = DOMPurify.sanitize(content);
      open({
        title,
        size: 'lg',
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
      leftSection={<IconFile size={12} />}
      disabled={!content || disabled}
      color="dark"
      variant="light"
      {...btnProps}
    >
      Read
    </Button>
  );
}
