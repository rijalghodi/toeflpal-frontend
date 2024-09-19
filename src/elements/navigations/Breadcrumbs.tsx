import {
  Anchor,
  Breadcrumbs as MantineBreadcrumbs,
  MantineSize,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

type Crumb = {
  href: string;
  label: string;
};
type Props = {
  items: Crumb[];
  size?: MantineSize;
};

export function Breadcrumbs({ items, size = 'sm' }: Props) {
  const length = items.length - 1;
  return (
    <MantineBreadcrumbs separator={<IconChevronRight size={16} />}>
      {items.map(({ href, label }, i) => (
        <Anchor
          underline="hover"
          component={Link}
          href={href}
          c={
            i === length
              ? 'var(--mantine-primary-color-5)'
              : 'var(--mantine-color-text)'
          }
          key={i}
          fz={size}
        >
          {label}
        </Anchor>
      ))}
    </MantineBreadcrumbs>
  );
}
