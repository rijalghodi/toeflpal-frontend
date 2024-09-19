import { Flex, Group, Stack, Text } from '@mantine/core';
import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  rightSection?: React.ReactNode;
};
export function SectionItem({ title, subtitle, rightSection }: Props) {
  return (
    <Flex
      direction={{ base: 'column', xs: 'row' }}
      w="100%"
      wrap="wrap"
      align="flex-start"
    >
      <Stack gap={8} flex={1}>
        <Text fz="sm">{title}</Text>
        <Text fz="sm" c="dimmed">
          {subtitle}
        </Text>
      </Stack>
      <Group w={{ base: '100%', xs: 'auto' }} justify="flex-end">
        {rightSection}
      </Group>
    </Flex>
  );
}
