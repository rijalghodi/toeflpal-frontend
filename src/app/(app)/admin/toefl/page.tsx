'use client';

import { Stack, Title } from '@mantine/core';
import React from 'react';

import { AdminToeflList } from '@/features/admin/AdminToeflList';

export default function AdminSimulationListPage() {
  return (
    <Stack>
      <Title fw={600} order={1} fz="h3">
        Manage TOEFL Simulation
      </Title>
      <AdminToeflList />
    </Stack>
  );
}
