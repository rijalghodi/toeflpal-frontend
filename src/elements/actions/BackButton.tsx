import { NavLink } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
};
export function BackButton({ href }: Props) {
  return (
    <NavLink
      component={Link}
      href={href}
      label="Kembali"
      leftSection={<IconArrowLeft size={16} />}
      py={4}
      w="min-content"
    />
  );
}
