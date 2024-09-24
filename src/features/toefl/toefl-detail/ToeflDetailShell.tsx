'use client';

import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

import { BackButton } from '@/elements/actions/BackButton';
import { toeflGet, toeflGetKey } from '@/services';
import { routes } from '@/utils/constant/routes';

import { TestSection } from './TestSection';
import { ToeflScoreRing } from './ToeflScoreRing';

export function ToeflDetailShell() {
  const { toeflId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: toeflGetKey({ toeflId: toeflId as string }),
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const toefl = data?.data;

  const listening = toefl?.listeningSection;
  const reading = toefl?.readingSection;
  const grammar = toefl?.grammarSection;

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
            25 Aug 2024
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
        toeflId=""
        name={listening?.name || 'Listening Section'}
        formId={listening?.id || ''}
        duration={listening?.duration || 0}
        questionNum={listening?.questionNum ?? 0}
      />
      <TestSection
        toeflId=""
        name={grammar?.name || 'Structure & Written Expression Section'}
        formId={grammar?.id || ''}
        duration={grammar?.duration || 0}
        questionNum={grammar?.questionNum ?? 0}
      />
      <TestSection
        toeflId=""
        name={reading?.name || 'Reading Section'}
        formId={reading?.id || ''}
        duration={reading?.duration || 0}
        questionNum={reading?.questionNum ?? 0}
      />
    </Stack>
  );
}
