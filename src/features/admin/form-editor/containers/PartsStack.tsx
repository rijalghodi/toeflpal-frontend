import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { LoadingState } from '@/elements';
import { partListKey, partlList } from '@/services/part/part-list';

import { PartContainer } from './PartContainer';

type Props = {
  formId: string;
};
export function PartsStack({ formId }: Props) {
  const { data: parts, isLoading } = useQuery({
    queryKey: partListKey({ formId }),
    queryFn: () => partlList({ formId }),
  });

  if (isLoading) return <LoadingState h={200} />;

  return (
    <Stack>
      {parts?.data.map(
        (
          {
            id,
            name,
            order,
            closing,
            closingAudio,
            instruction,
            instructionAudio,
          },
          idx,
        ) => (
          <PartContainer
            partId={id}
            formId={formId}
            name={name}
            order={order}
            instruction={instruction}
            instructionAudioUrl={instructionAudio?.url}
            closing={closing}
            closingAudioUrl={closingAudio?.url}
            key={idx}
          />
        ),
      )}
    </Stack>
  );
}
