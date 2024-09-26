'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';

import { LoadingState } from '@/elements';
import { ToeflReading } from '@/features/toefl/reading-simulation/ToeflReading';
import { toeflGet, toeflGetKey } from '@/services';

export default function ToeflGrammarPage() {
  const { toeflId } = useParams();

  // Get TOEFL
  const { data: toefl, isLoading } = useQuery({
    queryKey: toeflGetKey({ toeflId: toeflId as string }),
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const formId = toefl?.data.grammarSection.id;

  if (isLoading) {
    return <LoadingState h="100vh" />;
  }

  return (
    <Suspense>
      <ToeflReading formId={formId as string} toeflId={toeflId as string} />
    </Suspense>
  );
}
