import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { toeflGet, toeflGetKey } from '@/services';

import { TestSection } from '../presentations/TestSection';

type Props = {
  toeflId: string;
};
export function ToeflTestSection({ toeflId }: Props) {
  // TODO: Get toefl
  const { data } = useQuery({
    queryKey: toeflGetKey({ toeflId }),
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const toefl = data?.data;
  const listening = toefl?.listeningSection;
  const reading = toefl?.readingSection;
  const grammar = toefl?.grammarSection;

  return (
    <Stack>
      <TestSection
        toeflId=""
        name={grammar?.name || 'Structure & Written Expression Section'}
        formId={grammar?.id || ''}
        duration={grammar?.duration}
        questionNum={grammar?.questionNum}
      />
      <TestSection
        toeflId=""
        name={reading?.name || 'Reading Section'}
        formId={reading?.id || ''}
        duration={reading?.duration || 0}
        questionNum={reading?.questionNum}
      />
      <TestSection
        toeflId=""
        name={listening?.name || 'Listening Section'}
        formId={listening?.id || ''}
        duration={listening?.duration}
        questionNum={listening?.questionNum}
      />
    </Stack>
  );
}
