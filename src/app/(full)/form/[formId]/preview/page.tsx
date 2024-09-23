'use client';

import React, { Suspense } from 'react';

import { SimulationRouter } from '@/features/simulation/SimulationShell';

export default function FormPreviewPage() {
  return (
    <Suspense>
      <SimulationRouter />
    </Suspense>
  );
}
