'use client';

import { Anchor, Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlayerPlay } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

import { LoadingState } from '@/elements';
import { BackButton } from '@/elements/actions/BackButton';
import { LoginForm } from '@/features/auth/login/LoginForm';
import {
  evalGet,
  evalGetKey,
  toeflGet,
  toeflGetKey,
  useUserSelf,
} from '@/services';
import { routes } from '@/utils/constant/routes';

import { TestSection } from './TestSection';
import { ToeflScoreRing } from './ToeflScoreRing';

export function ToeflDetailShell() {
  const { toeflId } = useParams();
  const { user } = useUserSelf();
  // Fetch TOEFL data
  const { data, isLoading: loadingToefl } = useQuery({
    queryKey: toeflGetKey({ toeflId: toeflId as string }),
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const { data: dataEval, isLoading: loadingEval } = useQuery({
    queryKey: evalGetKey({ toeflId: toeflId as string }),
    queryFn: () => evalGet({ toeflId: toeflId as string }),
    enabled: !!toeflId && !!user,
  });

  const toefl = data?.data;

  const {
    listeningSection: listening,
    readingSection: reading,
    grammarSection: grammar,
  } = toefl || {};

  // Destructure eval data for sections
  const listeningEval = dataEval?.data?.listeningEval?.attempt || {};
  const grammarEval = dataEval?.data?.grammarEval?.attempt || {};
  const readingEval = dataEval?.data?.readingEval?.attempt || {};

  // Calculate the latest finished date from all sections
  const latestFinishedDate = useMemo(() => {
    const dates = [
      listeningEval?.finishedAt,
      grammarEval?.finishedAt,
      readingEval?.finishedAt,
    ].filter(Boolean);

    return dates.length
      ? new Date(
          Math.max(
            ...dates.map((date) => (date ? new Date(date).getTime() : 0)),
          ),
        )
      : null;
  }, [
    listeningEval?.finishedAt,
    grammarEval?.finishedAt,
    readingEval?.finishedAt,
  ]);

  const router = useRouter();

  const handleStartAllTest = () => {
    if (!user) {
      modals.open({
        children: (
          <Stack mt="xl">
            <Title order={1} fz="h2">
              Log In
            </Title>
            <Text fz="md">You need to log in to start the test.</Text>
            <LoginForm
              onSuccess={() => {
                modals.closeAll();
                router.push(routes.toeflGrammar(toeflId as string));
              }}
            />
            <Text fz="sm" c="dark.3" ta="center">
              No account?{' '}
              <Anchor
                fz="sm"
                href={routes.auth.register}
                component={Link}
                onClick={modals.closeAll}
              >
                Register here
              </Anchor>
            </Text>
          </Stack>
        ),
      });
      return;
    }
    router.push(routes.toeflGrammar(toeflId as string));
  };

  if (loadingEval || loadingToefl) {
    return <LoadingState h="calc(100vh - 140px)" />;
  }

  return (
    <Stack>
      <Box w="min-content">
        <BackButton href={routes.toeflList} />
      </Box>
      <Title order={1} fz="h2" ta="center">
        {toefl?.name}
      </Title>
      <Text c="dimmed" ta="center">
        {toefl?.description}
      </Text>

      <Group justify="space-between">
        <ToeflScoreRing
          score={dataEval?.data.totalScore ?? 0}
          maxScore={dataEval?.data.maxScore ?? 0}
        />
        <Stack align="flex-end">
          <Text fz="sm">
            <Text span c="dimmed" fz="sm">
              Date:
            </Text>{' '}
            <Text span fz="sm" fw={500}>
              {latestFinishedDate
                ? dayjs(latestFinishedDate).format('DD MMM YYYY')
                : 'No Attempt'}
            </Text>
          </Text>
          <Button
            leftSection={<IconPlayerPlay size={16} />}
            size="sm"
            variant="filled"
            onClick={handleStartAllTest}
          >
            Start Test
          </Button>
        </Stack>
      </Group>

      <TestSection
        toeflId={toeflId as string}
        name={grammar?.name || 'Structure & Written Expression Section'}
        formId={grammar?.id || ''}
        duration={grammar?.duration || 0}
        questionNum={grammar?.questionNum ?? 0}
        finishedAt={grammarEval?.finishedAt}
        startedAt={grammarEval?.startedAt}
        remainingTime={grammarEval?.remainingTime}
        correctAnswerNum={dataEval?.data.grammarEval?.correctAnswerNum}
        skillType="grammar"
      />
      <TestSection
        toeflId={toeflId as string}
        name={reading?.name || 'Reading Section'}
        formId={reading?.id || ''}
        duration={reading?.duration || 0}
        questionNum={reading?.questionNum ?? 0}
        finishedAt={readingEval?.finishedAt}
        startedAt={readingEval?.startedAt}
        remainingTime={readingEval?.remainingTime}
        correctAnswerNum={dataEval?.data.readingEval?.correctAnswerNum}
        skillType="reading"
      />
      <TestSection
        toeflId={toeflId as string}
        name={listening?.name || 'Listening Section'}
        formId={listening?.id || ''}
        duration={listening?.duration || 0}
        questionNum={listening?.questionNum ?? 0}
        correctAnswerNum={dataEval?.data.listeningEval?.correctAnswerNum}
        finishedAt={listeningEval?.finishedAt}
        startedAt={listeningEval?.startedAt}
        remainingTime={listeningEval?.remainingTime}
        skillType="listening"
      />
    </Stack>
  );
}
