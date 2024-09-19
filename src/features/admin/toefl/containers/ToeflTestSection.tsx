import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { toeflVersionLatestGet } from '@/services';

import { TestSection } from '../presentations/TestSection';

type Props = {
  toeflId: string;
};
export function ToeflTestSection(props: Props) {
  // TODO: Get latest version
  const { data } = useQuery({
    queryKey: ['toefl-version-latest-get', props.toeflId],
    queryFn: () => toeflVersionLatestGet({ toeflId: props.toeflId as string }),
    enabled: !!props.toeflId,
  });

  const toefl = data?.data;
  const listening = toefl?.listeningSection;
  const reading = toefl?.readingSection;
  const grammar = toefl?.grammarSection;

  return (
    <Stack>
      <TestSection
        toeflId=""
        name={listening?.name || 'Listening Section'}
        formId={listening?.id || ''}
        duration={listening?.duration || 0}
      />
      <TestSection
        toeflId=""
        name={grammar?.name || 'Structure & Written Expression Section'}
        formId={grammar?.id || ''}
        duration={grammar?.duration || 0}
      />
      <TestSection
        toeflId=""
        name={reading?.name || 'Reading Section'}
        formId={reading?.id || ''}
        duration={reading?.duration || 0}
      />
    </Stack>
  );
}
