import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';

import { routes } from '@/utils/constant/routes';

type Props = {
  toeflId: string;
  formId: string;
  name: string;
  questionNum?: number;
  duration?: number;
};
export function TestSection({ name, formId, questionNum, duration }: Props) {
  const { push } = useRouter();

  const handleChangeTest = () => {
    push(routes.formEditor(formId));
  };

  return (
    <Paper withBorder p="md" radius="md">
      <Group align="flex-start" justify="space-between" w="100%">
        <Stack gap={12}>
          <Group justify="space-between" wrap="wrap-reverse">
            <Title order={2} fz="xs" fw="500" tt="uppercase">
              {name}
            </Title>
          </Group>
          <Group>
            {questionNum && (
              <Text c="dimmed" fz="sm">
                {questionNum} Questions
              </Text>
            )}
            {duration && (
              <Text c="dimmed" fz="sm">
                {Math.floor(duration / 60)} minutes
              </Text>
            )}
          </Group>
        </Stack>
        <Button variant="default" onClick={handleChangeTest} size="xs">
          Change
        </Button>
      </Group>
    </Paper>
  );
}
