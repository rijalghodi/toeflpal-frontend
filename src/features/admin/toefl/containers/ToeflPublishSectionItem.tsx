import { Button } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { toeflGet } from '@/services';

import { SectionItem } from '../presentations/SectionItem';

type Props = {
  toeflId: string;
};
export function ToeflPublishSectionItem({ toeflId }: Props) {
  // Read Latest Version
  const { data, isLoading } = useQuery({
    queryKey: ['toefl-version-latest-get', toeflId],
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const published = data?.data.publishedAt;

  // Publish
  const {} = useMutation({});

  return (
    <SectionItem
      title="Publish"
      subtitle={
        published ? 'This test has published' : 'This test still drafted'
      }
      rightSection={
        published ? (
          <Button variant="light" color="red" disabled={isLoading} size="xs">
            Unpublish
          </Button>
        ) : (
          <Button variant="default" disabled={isLoading} size="xs">
            Publish
          </Button>
        )
      }
    />
  );
}
