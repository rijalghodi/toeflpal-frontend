import {
  Anchor,
  Button,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconCircleCheckFilled,
  IconPlayerPlay,
  IconRefresh,
} from '@tabler/icons-react';
import Link from 'next/link';
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
  const { open: openDrawer, close: closeDrawer } = useDrawer();

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
            <Text fz="md">You need to log in to start the test.</Text>
            <LoginForm
              onSuccess={() => {
                push(`/toefl/${toeflId}/${skillType}`);
              }}
            />
            <Text fz="sm" c="dark.3" ta="center">
              No account?{' '}
              <Anchor
                fz="sm"
                href={routes.auth.register}
                component={Link}
                onClick={closeDrawer}
              >
                Register here
              </Anchor>
            </Text>
          </Stack>
        ),
      });
      return;
    }
    push(`/toefl/${toeflId}/${skillType}`);
  };

  // const handleOpenEvaluation = () => {
  //   openDrawer({
  //     title: 'Evaluation',
  //     content: '',
  //   });
  // };

  return (
    <Paper withBorder p="md" radius="md">
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap="sm"
        align="flex-start"
        justify="space-between"
        w="100%"
      >
        <Stack gap={12}>
          <Group justify="space-between" wrap="wrap-reverse">
            <Title order={2} fz="xs" fw="700" tt="uppercase" lh={1.4}>
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
            {correctAnswerNum && (
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
      </Flex>
    </Paper>
  );
}
