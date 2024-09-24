'use client';

import { Box, Paper, Stack, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

import { LoadingState } from '@/elements';
import { BackButton } from '@/elements/actions/BackButton';
import { toeflGet, toeflGetKey } from '@/services';
import { routes } from '@/utils/constant/routes';

import { ToeflGeneralSection } from './containers/ToeflGeneralSection';
import { ToeflPremiumSectionItem } from './containers/ToeflPremiumSectionItem';
import { ToeflPublicationSection } from './containers/ToeflPublicationSection';
import { ToeflPublishSectionItem } from './containers/ToeflPublishSectionItem';
import { ToeflTestSection } from './containers/ToeflTestSection';
import { TestSection } from './presentations/TestSection';

export function AdminToeflDetailShell() {
  const { toeflId } = useParams();

  const { data, isLoading, refetch } = useQuery({
    queryKey: toeflGetKey({ toeflId: toeflId as string }),
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const toefl = data?.data;
  const listening = toefl?.listeningSection;
  const reading = toefl?.readingSection;
  const grammar = toefl?.grammarSection;

  console.log(toefl);

  if (isLoading) {
    return <LoadingState h="calc(100vh - 140px)" />;
  }

  return (
    <Stack>
      <Title order={1} h={0} fz={0} pos="absolute">
        TOEFL
      </Title>
      <Box w="min-content">
        <BackButton href={routes.adminToeflList} />
      </Box>

      {/* General */}
      <ToeflGeneralSection
        toeflId={toeflId as string}
        name={toefl?.name}
        description={toefl?.description}
      />
      <Stack>
        <TestSection
          toeflId=""
          name={listening?.name || 'Listening Section'}
          formId={listening?.id || ''}
          duration={listening?.duration}
          questionNum={listening?.questionNum}
        />
        <TestSection
          toeflId=""
          name={grammar?.name || 'Structure & Written Expression Section'}
          formId={grammar?.id || ''}
          duration={grammar?.duration}
          questionNum={grammar?.questionNum}
        />
        <TestSection
          toeflId=""
          name={reading?.name || 'Reading Section'}
          formId={reading?.id || ''}
          duration={reading?.duration || 0}
          questionNum={reading?.questionNum}
        />
      </Stack>
      <Paper withBorder p="md" radius="md">
        <Stack>
          <Title order={2} fz="xs" fw="700" tt="uppercase">
            Publication
          </Title>
          <ToeflPublishSectionItem
            toeflId={toeflId as string}
            published={!!toefl?.publishedAt}
            onSuccess={refetch}
          />
          <ToeflPremiumSectionItem
            toeflId={toeflId as string}
            premium={toefl?.premium}
            onSuccess={refetch}
          />
        </Stack>
      </Paper>
    </Stack>
  );
}
