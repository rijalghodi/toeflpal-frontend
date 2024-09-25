'use client';

import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

import { useUser } from '@/contexts';
import { LoadingState } from '@/elements';
import { BackButton } from '@/elements/actions/BackButton';
import { evalGet, evalGetKey, toeflGet, toeflGetKey } from '@/services';
import { routes } from '@/utils/constant/routes';

import { TestSection } from './TestSection';
import { ToeflScoreRing } from './ToeflScoreRing';

export function ToeflDetailShell() {
  const { toeflId } = useParams();
  const { user } = useUser();

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

  if (loadingEval || loadingToefl) {
    return <LoadingState h="calc(100vh - 140px)" />;
  }

  return (
    <Stack>
      <Box w="min-content">
        <BackButton href={routes.toeflList} />
      </Box>
      <Title order={1} fz="h2" ta="center">
        TOEFL Test
      </Title>
      <Text c="dimmed" ta="center">
        Description
      </Text>

      <Group justify="space-between">
        <ToeflScoreRing score={80} totalScore={100} />
        <Stack align="flex-end">
          <Text fz="sm">
            <Text span c="dimmed" fz="sm">
              Date:
            </Text>{' '}
            {latestFinishedDate?.toLocaleDateString() || 'N/A'}
          </Text>
          <Button
            leftSection={<IconRefresh size={16} />}
            size="sm"
            variant="light"
          >
            Restart
          </Button>
        </Stack>
      </Group>

      <TestSection
        toeflId={toeflId as string}
        name={listening?.name || 'Listening Section'}
        formId={listening?.id || ''}
        duration={listening?.duration || 0}
        questionNum={listening?.questionNum ?? 0}
        finishedAt={listeningEval?.finishedAt}
        startedAt={listeningEval?.startedAt}
        remainingTime={listeningEval?.remainingTime}
      />
      <TestSection
        toeflId={toeflId as string}
        name={grammar?.name || 'Structure & Written Expression Section'}
        formId={grammar?.id || ''}
        duration={grammar?.duration || 0}
        questionNum={grammar?.questionNum ?? 0}
        finishedAt={grammarEval?.finishedAt}
        startedAt={grammarEval?.startedAt}
        remainingTime={grammarEval?.remainingTime}
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
      />
    </Stack>
  );
}
