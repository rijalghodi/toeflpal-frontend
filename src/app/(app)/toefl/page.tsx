'use client';

import { Stack, Title } from '@mantine/core';
import React from 'react';

import { ToeflList } from '@/features/toefl/ToeflList';

export default function UserSimulationListPage() {
  return (
    <Stack>
      <Title fw={600} order={1} fz="h2">
        TOEFL Simulation
      </Title>
      <ToeflList />
    </Stack>
  );
}
