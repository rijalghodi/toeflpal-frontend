import { Button } from '@mantine/core';
import { IconCrown } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { toeflGet } from '@/services';

import { SectionItem } from '../presentations/SectionItem';

type Props = {
  toeflId: string;
};
export function ToeflPremiumSectionItem({ toeflId }: Props) {
  // Read Latest Version
  const { data, isLoading } = useQuery({
    queryKey: ['toefl-version-latest-get', toeflId],
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const premium = data?.data.premium;

  // Premium
  const {} = useMutation({});

  return (
    <SectionItem
      title="Premium"
      subtitle={premium ? 'This test is premium' : 'This test is premium'}
      rightSection={
        premium ? (
          <Button
            variant="filled"
            color="yellow.7"
            disabled={isLoading}
            size="xs"
            leftSection={<IconCrown size={16} />}
          >
            Make Premium
          </Button>
        ) : (
          <Button variant="default" disabled={isLoading} size="xs">
            Make Free
          </Button>
        )
      }
    />
  );
}
