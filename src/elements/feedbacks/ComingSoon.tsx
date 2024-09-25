import { Center, CenterProps, MantineSize, Stack, Text } from '@mantine/core';
import React from 'react';

import { Logo } from '../brand/Logo';

type Props = CenterProps & { loaderSize?: MantineSize };
export function ComingSoon({ h = 300, w = '100%', ...cntrProps }: Props) {
  return (
    <Center {...cntrProps} h={h} w={w}>
      <Stack align="center" gap="xs">
        <Logo size="md" />
        <Text fz="h3" fw={500} ta="center">
          Coming Soon
        </Text>
      </Stack>
    </Center>
  );
}
