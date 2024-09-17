import { Center, CenterProps, MantineSize, Text } from '@mantine/core';
import React from 'react';

type Props = CenterProps & { loaderSize?: MantineSize };
export function ComingSoon({ h = 300, w = '100%', ...cntrProps }: Props) {
  return (
    <Center {...cntrProps} h={h} w={w}>
      <Text fz="h3" fw={600}>
        Coming Soon
      </Text>
    </Center>
  );
}
