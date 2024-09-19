import { Button, Group } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { toeflVersionLatestGet } from '@/services';

import { SectionItem } from '../presentations/SectionItem';

type Props = {
  toeflId: string;
};
export function ToeflUpdateSectionItem({ toeflId }: Props) {
  // Read Latest Version
  const { data, isLoading } = useQuery({
    queryKey: ['toefl-version-latest-get', toeflId],
    queryFn: () => toeflVersionLatestGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const updatable = data?.data.active;

  const {} = useMutation({});

  return (
    <SectionItem
      title="Update"
      subtitle={
        updatable
          ? 'This test has newer version than published ones'
          : 'This test is up to date'
      }
      rightSection={
        updatable ? (
          <Group>
            <Button color="red" variant="light" disabled={isLoading} size="xs">
              Revert
            </Button>
            <Button variant="default" disabled={isLoading} size="xs">
              Push
            </Button>
          </Group>
        ) : null
      }
    />
  );
}
