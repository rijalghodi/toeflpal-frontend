'use client';

import { Stack } from '@mantine/core';
import React, { Suspense } from 'react';

import { ToeflDetailShell } from '@/features/admin/toefl/ToeflDetailShell';

export default function ToeflDetailPage() {
  return (
    <Stack>
      <Suspense>
        <ToeflDetailShell />
      </Suspense>
    </Stack>
  );
}
