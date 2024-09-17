import { Group, MantineSize, Text } from '@mantine/core';
import Image from 'next/image';
import React, { useMemo } from 'react';

import logo from '~/logo.png';

type Props = {
  size: MantineSize;
};

export function LogoAndText({ size }: Props) {
  const brandSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return { width: 40, height: 40, fontSize: 'h5' };
      case 'sm':
        return { width: 50, height: 50, fontSize: 'h4' };
      case 'md':
        return { width: 60, height: 60, fontSize: 'h3' };
      case 'lg':
        return { width: 72, height: 72, fontSize: 'h2' };
      case 'xl':
        return { width: 80, height: 80, fontSize: 'h1' };
      default:
        return { width: 50, height: 50, fontSize: 'h4' };
    }
  }, []);
  return (
    <Group gap="xs">
      <Image
        src={logo}
        alt="Logo"
        height={brandSize.height}
        width={brandSize.width}
      />
      <Text fw={800} fz={brandSize.fontSize} ff="heading" c="indigo.5">
        TOEFL PAL
      </Text>
    </Group>
  );
}
