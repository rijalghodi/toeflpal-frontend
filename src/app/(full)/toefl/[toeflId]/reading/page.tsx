'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';

import { LoadingState } from '@/elements';
import { ToeflReading } from '@/features/toefl/reading-simulation/ToeflReading';
import { toeflGet, toeflGetKey } from '@/services';

export default function ToeflRaedingPage() {
  const { toeflId } = useParams();
  console.log(toeflId);

  // Get TOEFL
  const { data: toefl, isLoading } = useQuery({
    queryKey: toeflGetKey({ toeflId: toeflId as string }),
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
  });

  const formId = toefl?.data.readingSection.id;

  if (isLoading) {
    return <LoadingState h="100vh" />;
  }

  return (
    <Suspense>
      <ToeflReading formId={formId as string} />
    </Suspense>
  );
}
