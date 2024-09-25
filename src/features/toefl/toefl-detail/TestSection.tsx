import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import {
  IconCircleCheckFilled,
  IconPlayerPlay,
  IconRefresh,
} from '@tabler/icons-react';
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
  skillType: string;
  correctAnswerNum?: number;
};
export function TestSection({
  name,
  toeflId,
  questionNum,
  duration,
  startedAt,
  finishedAt,
  remainingTime,
  skillType,
  correctAnswerNum,
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
        content: (
          <Stack mt="xl">
            <Title order={1} fz="h2">
              Log In
            </Title>
            <Text fz="lg">You need to log in to start the test.</Text>
            <LoginForm
              onSuccess={() => {
                push(`/toefl/${toeflId}/${skillType}`);
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
          <Group gap="lg">
            {duration && (
              <Text c="dimmed" fz="sm">
                {duration} minutes
              </Text>
            )}
            {questionNum !== undefined && (
              <Text c="dimmed" fz="sm">
                {questionNum} Questions
              </Text>
            )}
            {correctAnswerNum !== undefined && (
              <Group gap={4}>
                <IconCircleCheckFilled color="#5c7cfa" size={16} />
                <Text c="dimmed" fz="sm">
                  {correctAnswerNum}
                </Text>
              </Group>
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
