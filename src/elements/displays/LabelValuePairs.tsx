import { Box, Group, MantineSize, Stack, Text } from '@mantine/core';
import React from 'react';

type Props = {
  data: {
    label: string;
    value: React.ReactNode;
  }[];
  gapVertical?: MantineSize | number;
  labelMinWidth?: number | string;
};
export function LabelValuePairs({
  data,
  gapVertical = 12,
  labelMinWidth = 100,
}: Props) {
  return (
    <Stack gap={gapVertical} w="100%">
      {data.map(({ label, value }, i) => (
        <Group w="100%" align="flex-start" key={i} justify="flex-start">
          <Text miw={labelMinWidth} size="sm">
            {label}
          </Text>
          {typeof value === 'string' ? (
            <Text c="dimmed" flex={1} size="sm">
              {value}
            </Text>
          ) : (
            <Box flex={1}>{value}</Box>
          )}
        </Group>
      ))}
    </Stack>
  );
}
