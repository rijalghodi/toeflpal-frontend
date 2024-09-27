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
import { modals } from '@mantine/modals';
import {
  IconCircleCheckFilled,
  IconPlayerPlay,
  IconRefresh,
  IconStethoscope,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

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
  const router = useRouter();

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
      modals.open({
        radius: 'md',
        children: (
          <Stack>
            <Title order={1} fz="h2" ta="center">
              Log In
            </Title>
            <Text fz="md" ta="center">
              You need to log in to start the test.
            </Text>
            <LoginForm
              onSuccess={() => {
                modals.closeAll();
                router.push(`/toefl/${toeflId}/${skillType}`);
              }}
            />
            <Text fz="sm" c="dark.3" ta="center">
              No account?{' '}
              <Anchor
                fz="sm"
                href={routes.auth.register}
                component={Link}
                onClick={() => modals.closeAll()}
              >
                Register here
              </Anchor>
            </Text>
          </Stack>
        ),
      });
      return;
    }
    router.push(`/toefl/${toeflId}/${skillType}`);
  };

  const handleOpenEvaluation = () => {
    router.push(`/toefl/${toeflId}/${skillType}/evaluation`);
  };

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
          {status === 'Finished' && (
            <Button
              variant="default"
              onClick={handleOpenEvaluation}
              size="xs"
              leftSection={<IconStethoscope size={16} />}
            >
              Evaluation
            </Button>
          )}
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
