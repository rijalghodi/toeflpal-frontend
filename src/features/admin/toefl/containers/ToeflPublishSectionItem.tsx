import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { toeflGet, toeflGetKey, toeflPublish } from '@/services';

import { SectionItem } from '../presentations/SectionItem';

type Props = {
  toeflId: string;
};
export function ToeflPublishSectionItem({ toeflId }: Props) {
  // Read Latest Version
  const { data, isLoading, refetch } = useQuery({
    queryKey: toeflGetKey({ toeflId: toeflId as string }),
    queryFn: () => toeflGet({ toeflId: toeflId as string }),
    enabled: !!toeflId,
  });

  const published = data?.data.publishedAt;

  // Publish
  const { mutateAsync: publishToefl, isPending } = useMutation({
    mutationFn: toeflPublish,
    onSuccess: (data) => {
      refetch();
      notifications.update({
        id: 'toefl-publish',
        message: data.data.publishedAt
          ? 'Success publishing TOEFL'
          : 'Success unpublishing TOEFL',
        icon: <IconCheck size={16} />,
        color: 'green',
        loading: false,
        autoClose: 3000,
        withCloseButton: true,
      });
    },
    onError: () => {
      notifications.update({
        id: 'toefl-publish',
        message: 'Fail publishing TOEFL',
        icon: <IconX size={16} />,
        color: 'red',
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
      });
    },
  });

  const handlePublish = async (publish: boolean) => {
    notifications.show({
      id: 'toefl-publish',
      message: 'Loading...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    await publishToefl({ toeflId, publish });
  };

  return (
    <SectionItem
      title="Publish"
      subtitle={
        published ? 'This test has published' : 'This test still drafted'
      }
      rightSection={
        published ? (
          <Button
            variant="light"
            color="red"
            disabled={isLoading || isPending}
            size="xs"
            onClick={() => handlePublish(false)}
          >
            Unpublish
          </Button>
        ) : (
          <Button
            variant="default"
            disabled={isLoading || isPending}
            size="xs"
            onClick={() => handlePublish(true)}
          >
            Publish
          </Button>
        )
      }
    />
  );
}
