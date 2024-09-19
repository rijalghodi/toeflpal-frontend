import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { toeflGet } from '@/services';

type Props = {
  toeflId: string;
};
export function ToeflGeneralSection({ toeflId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['toefl-get', toeflId],
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const toefl = data?.data;

  const list = [
    {
      label: 'Name',
      value: toefl?.name,
    },
    {
      label: 'Description',
      value: toefl?.description,
    },
  ];

  return (
    <Paper withBorder p="md" radius="md">
      <Group align="flex-start" justify="space-between" w="100%">
        <Stack gap={12}>
          <Group justify="space-between" wrap="wrap-reverse">
            <Title order={2} fz="xs" fw="500" tt="uppercase">
              General Information
            </Title>
          </Group>
          <Stack gap={12}>
            {list.map(({ label, value }) => (
              <Group w="100%" align="flex-start">
                <Text flex={1} miw={100} size="sm">
                  {label}
                </Text>
                <Text c="dimmed" flex={4} size="sm">
                  {value}
                </Text>
              </Group>
            ))}
          </Stack>
        </Stack>
        <Button variant="default" size="xs" disabled={isLoading}>
          Change
        </Button>
      </Group>
    </Paper>
  );
}
