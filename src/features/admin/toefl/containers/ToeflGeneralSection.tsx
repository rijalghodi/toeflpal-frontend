import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { useDrawer } from '@/contexts';
import { toeflGet, toeflGetKey } from '@/services';

import { ToeflGeneralUpdate } from './ToeflGeneralUpdate';

type Props = {
  toeflId: string;
  name?: string;
  description?: string;
};
export function ToeflGeneralSection({ toeflId, name, description }: Props) {
  const { open, close } = useDrawer();

  // const { data, isLoading } = useQuery({
  //   queryKey: toeflGetKey({ toeflId: toeflId as string }),
  //   queryFn: () => toeflGet({ toeflId: toeflId as string }),
  //   enabled: !!toeflId,
  // });

  // const toefl = data?.data;

  const list = [
    {
      label: 'Name',
      value: name,
    },
    {
      label: 'Description',
      value: description,
    },
  ];

  const handleUpdateToeflGeneral = () => {
    open({
      title: 'Change TOEFL Information',
      content: (
        <ToeflGeneralUpdate
          toeflId={toeflId}
          initValues={{ description: description, name: name }}
          onSuccess={() => {
            close();
          }}
        />
      ),
    });
  };

  return (
    <Paper withBorder p="md" radius="md">
      <Group align="flex-start" justify="space-between" w="100%">
        <Stack gap={12}>
          <Group justify="space-between" wrap="wrap-reverse">
            <Title order={2} fz="xs" fw="700" tt="uppercase">
              General Information
            </Title>
          </Group>
          <Stack gap={12}>
            {list.map(({ label, value }, i) => (
              <Group w="100%" align="flex-start" key={i}>
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
        <Button variant="default" size="xs" onClick={handleUpdateToeflGeneral}>
          Change
        </Button>
      </Group>
    </Paper>
  );
}
