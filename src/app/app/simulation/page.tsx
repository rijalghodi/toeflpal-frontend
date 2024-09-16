'use client';

import { Stack, Text, Title } from '@mantine/core';
import React from 'react';

import { ToeflList } from '@/features/simulation/ToeflList';

type Props = {};
export default function AllSimulationPage(props: Props) {
  return (
    <Stack>
      <Title fw={600} order={1} fz="h2">
        TOEFL Simulation
      </Title>
      <Text c="dark.3">Chose one and try your best!</Text>
      <ToeflList />
    </Stack>
  );
}
