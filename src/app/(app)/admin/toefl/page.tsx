'use client';

import { Stack, Title } from '@mantine/core';
import React, { Suspense } from 'react';

import { AdminToeflListCotainer } from '@/features/admin/toefl-list/containers/AdminToeflListContainer';

export default function AdminSimulationListPage() {
  return (
    <Stack>
      <Title fw={600} order={1} fz="h3">
        Manage TOEFL Simulation
      </Title>
      <Suspense>
        <AdminToeflListCotainer />
      </Suspense>
    </Stack>
  );
}
