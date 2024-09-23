import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
};
export function BackButton({ href }: Props) {
  return (
    <Button
      component={Link}
      href={href}
      leftSection={<IconArrowLeft size={16} />}
      size="xs"
      w="min-content"
      variant="subtle"
      color="dark"
    >
      Back
    </Button>
  );
}
