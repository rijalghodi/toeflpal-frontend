import { Group, MantineSize, Stack, Text } from '@mantine/core';
import React from 'react';

type Props = {
  data: {
    key: string;
    value: React.ReactNode;
  }[];
  gapVertical?: MantineSize | number;
  keyMinWidth?: number | string;
};
export function KeyValuePairs({
  data,
  gapVertical = 12,
  keyMinWidth = 100,
}: Props) {
  return (
    <Stack gap={gapVertical}>
      {data.map(({ key, value }, i) => (
        <Group w="100%" align="flex-start" key={i}>
          <Text flex={1} miw={keyMinWidth} size="sm">
            {key}
          </Text>
          {typeof value === 'string' ? (
            <Text c="dimmed" flex={4} size="sm">
              {value}
            </Text>
          ) : (
            value
          )}
        </Group>
      ))}
    </Stack>
  );
}
