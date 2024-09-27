'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';

import { LoadingState } from '@/elements';
import { ReadingEvaluationPresenter } from '@/features/simulation/reading/evaluation/ReadingEvaluationPresenter';
import { toeflGet, toeflGetKey } from '@/services';

export default function ToeflReadingEvaluationPage() {
  const { toeflId } = useParams();

  // Get TOEFL
  const { data: toefl, isLoading } = useQuery({
    queryKey: toeflGetKey({ toeflId: toeflId as string }),
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const formId = toefl?.data?.grammarSection?.id;

  if (isLoading) {
    return <LoadingState h="100vh" />;
  }

  return (
    <Suspense>
      <ReadingEvaluationPresenter formId={formId as string} />
    </Suspense>
  );
}
