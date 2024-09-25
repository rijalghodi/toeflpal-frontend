import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconPlayerPlay, IconRefresh } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

import { useDrawer } from '@/contexts';
import { LoginForm } from '@/features/auth/login/LoginForm';
import { useUserSelf } from '@/services';
import { routes } from '@/utils/constant/routes';

type Props = {
  toeflId: string;
  formId: string;
  name: string;
  questionNum?: number;
  duration?: number;
  startedAt?: string;
  finishedAt?: string;
  canceledAt?: string;
  remainingTime?: number;
};
export function TestSection({
  name,
  formId,
  toeflId,
  questionNum,
  duration,
  startedAt,
  finishedAt,
  remainingTime,
}: Props) {
  const { user } = useUserSelf();
  const { push } = useRouter();
  const { open: openDrawer } = useDrawer();

  // Status:
  // Not taken: startedAt null
  // In progress: startedAt not null, finishedAt null && endtime < server time
  // Finished: startedAt not null, finishedAt not null || endtime > server time
  const status = useMemo(() => {
    if (!startedAt) {
      return 'Not taken';
    }

    if ((startedAt && finishedAt) || (remainingTime ?? 0) < 0) {
      return 'Finished';
    }

    if ((remainingTime ?? 0) > 0) {
      return 'In progress';
    }

    return 'Unknown';
  }, [finishedAt, startedAt, remainingTime]);

  const handleStartTest = () => {
    if (!user) {
      openDrawer({
        title: 'Please Log In',
        content: (
          <Stack gap={8}>
            <Text fz="lg">You need to log in to start the test.</Text>
            <LoginForm
              onSuccess={() => {
                push(routes.toeflGrammar(toeflId));
              }}
            />
          </Stack>
        ),
      });
      return;
    }
    push(routes.toeflReading(toeflId));
  };

  // const handleOpenEvaluation = () => {
  //   openDrawer({
  //     title: 'Evaluation',
  //     content: '',
  //   });
  // };

  return (
    <Paper withBorder p="md" radius="md">
      <Group align="flex-start" justify="space-between" w="100%">
        <Stack gap={12}>
          <Group justify="space-between" wrap="wrap-reverse">
            <Title order={2} fz="xs" fw="700" tt="uppercase">
              {name}
            </Title>
          </Group>
          <Group>
            {questionNum !== undefined && (
              <Text c="dimmed" fz="sm">
                {questionNum} Questions
              </Text>
            )}
            {duration && (
              <Text c="dimmed" fz="sm">
                {Math.floor(duration)} minutes
              </Text>
            )}
          </Group>
        </Stack>
        <Group>
          {/* {status === 'Finished' && (
            <Button
              variant="default"
              onClick={handleOpenEvaluation}
              size="xs"
              leftSection={<IconChartLine size={16} />}
            >
              Evaluation
            </Button>
          )} */}

          <Button
            variant="default"
            onClick={handleStartTest}
            size="xs"
            leftSection={
              status === 'Finished' ? (
                <IconRefresh size={16} />
              ) : (
                <IconPlayerPlay size={16} />
              )
            }
          >
            {status === 'Finished' ? 'Restart' : 'Start'}
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
