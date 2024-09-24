'use client';

import { Stack } from '@mantine/core';
import React, { Suspense } from 'react';

import { AdminToeflDetailShell } from '@/features/admin/toefl/AdminToeflDetailShell';

export default function ToeflDetailPage() {
  return (
    <Stack>
      <Suspense>
        <AdminToeflDetailShell />
      </Suspense>
    </Stack>
  );
}
