'use client';

import { Stack, Title } from '@mantine/core';
import React from 'react';

import { ToeflList } from '@/features/simulation/ToeflList';

type Props = {};
export default function AllSimulationPage(props: Props) {
  return (
    <Stack>
      <Title fw={600} order={1} fz="h2">
        TOEFL Simulation
      </Title>
      <ToeflList />
    </Stack>
  );
}
