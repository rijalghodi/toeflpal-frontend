import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconCrown, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { toeflPremium } from '@/services';

import { SectionItem } from '../presentations/SectionItem';

type Props = {
  toeflId: string;
  premium?: boolean;
  onSuccess?: () => void;
};
export function ToeflPremiumSectionItem({
  toeflId,
  premium,
  onSuccess,
}: Props) {
  // Premium
  const { mutateAsync: premiumToefl, isPending } = useMutation({
    mutationFn: toeflPremium,
    onSuccess: (data) => {
      onSuccess?.();
      notifications.update({
        id: 'toefl-premium',
        message: data.data.premium
          ? 'Success make TOEFL premium'
          : 'Success make TOEFL free',
        icon: <IconCheck size={16} />,
        color: 'green',
        loading: false,
        autoClose: 3000,
        withCloseButton: true,
      });
    },
    onError: () => {
      notifications.update({
        id: 'toefl-premium',
        message: 'Fail',
        icon: <IconX size={16} />,
        color: 'red',
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
      });
    },
  });

  const handlePremium = async (premium: boolean) => {
    notifications.show({
      id: 'toefl-premium',
      message: 'Loading...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    await premiumToefl({ toeflId, premium });
  };

  return (
    <SectionItem
      title="Premium"
      subtitle={premium ? 'This test is premium' : 'This test is free'}
      rightSection={
        premium ? (
          <Button
            variant="default"
            size="xs"
            onClick={() => handlePremium(false)}
            disabled={isPending}
          >
            Make Free
          </Button>
        ) : (
          <Button
            variant="filled"
            color="orange"
            size="xs"
            leftSection={<IconCrown size={16} />}
            onClick={() => handlePremium(true)}
            disabled={isPending}
          >
            Make Premium
          </Button>
        )
      }
    />
  );
}
