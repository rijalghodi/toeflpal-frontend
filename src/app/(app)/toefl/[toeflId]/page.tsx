'use client';

import React, { Suspense } from 'react';

import { ToeflDetailShell } from '@/features/toefl/toefl-detail/ToeflDetailShell';

export default function UserSimulationListPage() {
  return (
    <Suspense>
      <ToeflDetailShell />
    </Suspense>
  );
}
