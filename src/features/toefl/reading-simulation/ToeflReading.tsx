import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ReadingFormPresenter } from '@/features/simulation';
import { evalGetKey, evalStale } from '@/services';
import { attemptFinish } from '@/services/attempt/attempt-finish';
import { attemptGetKey } from '@/services/attempt/attempt-get';
import { attemptStart } from '@/services/attempt/attempt-start';
import { Answer } from '@/services/types';
import { routes } from '@/utils/constant/routes';

type Props = {
  toeflId: string;
  formId: string;
};
export function ToeflReading({ toeflId, formId }: Props) {
  const router = useRouter();
  const q = useQueryClient();

  const handleQuit = () => {
    modals.openConfirmModal({
      title: 'Quit Confirmation',
      children: (
        <Text size="sm" c="dimmed">
          Are you sure you want to quit the test? You will lose all your current
          data for this section.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        router.push(routes.toeflDetail(formId as string));
      },
    });
  };

  const { mutateAsync: start } = useMutation({
    mutationFn: attemptStart,
    onSuccess: () => {
      notifications.hide('toefl-start');
      q.invalidateQueries({ queryKey: evalGetKey({ toeflId }) });
      q.refetchQueries({ queryKey: attemptGetKey({ formId }) });
    },
    onError: (error) => {
      notifications.update({
        title: 'Fail to start',
        message: error.message,
        id: 'toefl-start',
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        icon: <IconX size={16} />,
        color: 'red',
      });
    },
  });

  const { mutateAsync: submit } = useMutation({
    mutationFn: async ({
      formId,
      toeflId,
      answers,
    }: {
      formId: string;
      toeflId: string;
      answers: Answer[];
    }) => {
      await attemptFinish({ formId, answers });
      const stale = await evalStale({ toeflId, stale: true });
      return stale;
    },
    onSuccess: () => {
      notifications.update({
        message: 'Success! Your answers has been submitted',
        id: 'toefl-submit',
        loading: false,
        autoClose: 3000,
        withCloseButton: true,
        icon: <IconCheck size={16} />,
        color: 'green',
      });
      q.invalidateQueries({ queryKey: evalGetKey({ toeflId }) });
      q.refetchQueries({ queryKey: evalGetKey({ toeflId }) });
      router.push(routes.toeflDetail(toeflId));
    },
    onError: (error) => {
      notifications.update({
        title: 'Fail to submit',
        message: error.message,
        id: 'toefl-submit',
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
        icon: <IconX size={16} />,
        color: 'red',
      });
    },
  });

  const handleStart = async () => {
    notifications.show({
      message: 'Loading Start...',
      id: 'toefl-start',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    return await start({ formId });
  };

  const handleSubmit = async (answers: Answer[], formId: string) => {
    notifications.show({
      message: 'Submitting your answers...',
      id: 'toefl-submit',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    return await submit({ formId, toeflId, answers });
  };

  const handleFinsih = () => {};
  return (
    <ReadingFormPresenter
      formId={formId}
      onQuit={handleQuit}
      onStart={handleStart}
      onSubmit={handleSubmit}
      onFinsih={handleFinsih}
    />
  );
}
