import { Center, CenterProps, Loader, MantineSize } from '@mantine/core';
import React from 'react';

type Props = CenterProps & { loaderSize?: MantineSize };
export function LoadingState({
  loaderSize = 'md',
  h = 300,
  w = '100%',
  ...cntrProps
}: Props) {
  return (
    <Center {...cntrProps} h={h} w={w}>
      <Loader size={loaderSize} />
    </Center>
  );
}
