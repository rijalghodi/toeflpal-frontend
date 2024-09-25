import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ReadingFormPresenter } from '@/features/simulation';
import { Answer } from '@/services/types';
import { routes } from '@/utils/constant/routes';

type Props = {
  formId: string;
};
export function ToeflReading({ formId }: Props) {
  const router = useRouter();
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

  const handleUpdateAnswer = (answers: Answer) => {
    // TODO: Update answer in the database or state
  };
  return <ReadingFormPresenter formId={formId} onQuit={handleQuit} />;
}
