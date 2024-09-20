import { MantineSize } from '@mantine/core';
import Image from 'next/image';
import React, { useMemo } from 'react';

import logo from '~/logo.png';

type Props = {
  size: MantineSize;
};

export function Logo({ size }: Props) {
  const brandSize = useMemo(() => {
    switch (size) {
      case 'xs':
        return { width: 40, height: 40 };
      case 'sm':
        return { width: 50, height: 50 };
      case 'md':
        return { width: 60, height: 60 };
      case 'lg':
        return { width: 72, height: 72 };
      case 'xl':
        return { width: 80, height: 80 };
      default:
        return { width: 50, height: 50 };
    }
  }, []);
  return (
    <Image
      src={logo}
      alt="Logo"
      height={brandSize.height}
      width={brandSize.width}
    />
  );
}
