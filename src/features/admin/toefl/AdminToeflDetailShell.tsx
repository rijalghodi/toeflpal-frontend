'use client';

import { Box, Stack, Title } from '@mantine/core';
import { useParams } from 'next/navigation';
import React from 'react';

import { BackButton } from '@/elements/actions/BackButton';
import { routes } from '@/utils/constant/routes';

import { ToeflGeneralSection } from './containers/ToeflGeneralSection';
import { ToeflPublicationSection } from './containers/ToeflPublicationSection';
import { ToeflTestSection } from './containers/ToeflTestSection';

export function AdminToeflDetailShell() {
  const { toeflId } = useParams();

  return (
    <Stack>
      <Title order={1} h={0} fz={0} pos="absolute">
        TOEFL
      </Title>
      <Box w="min-content">
        <BackButton href={routes.adminToeflList} />
      </Box>

      {/* General */}
      <ToeflGeneralSection toeflId={toeflId as string} />
      <ToeflTestSection toeflId={toeflId as string} />
      <ToeflPublicationSection toeflId={toeflId as string} />
    </Stack>
  );
}
