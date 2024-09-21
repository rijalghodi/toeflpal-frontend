import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useDrawer } from '@/contexts';
import { partDelete, partListKey } from '@/services';

import { PartWrapper } from '../presentations/PartWrapper';
import { PartCreate } from './PartCreate';
import { PartUpdate } from './PartUpdate';

type Props = {
  partId: string;
  formId: string;
  order: number;
  name?: string;
  instruction?: string;
  instructionAudioUrl?: string;
  closing?: string;
  closingAudioUrl?: string;
};
export function PartContainer({
  formId,
  partId,
  order,
  name,
  instruction,
  instructionAudioUrl,
  closing,
  closingAudioUrl,
}: Props) {
  const { open: openDrawer, close: closeDrawer } = useDrawer();
  const q = useQueryClient();

  // Get questions

  const handleAddPartBelow = () => {
    openDrawer({
      content: (
        <PartCreate formId={formId} order={order + 1} onSuccess={closeDrawer} />
      ),
      title: 'Add New Part',
    });
  };

  const handleEditPart = () => {
    openDrawer({
      content: (
        <PartUpdate
          formId={formId}
          partId={partId}
          onSuccess={closeDrawer}
          initValues={{
            name: name,
            closing,
            instruction,
            instructionAudioUrl,
            closingAudioUrl,
          }}
        />
      ),
      title: 'Edit Part',
    });
  };

  const { mutateAsync: deletePart } = useMutation({
    mutationFn: partDelete,
    onSuccess: () => {
      q.refetchQueries({ queryKey: partListKey({ formId }) });
      notifications.update({
        message: 'Success',
        id: 'part-delete',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 3000,
        loading: false,
        withCloseButton: true,
      });
    },
    onError: () => {
      notifications.update({
        message: 'Fail',
        id: 'part-delete',
        color: 'red',
        autoClose: 5000,
        icon: <IconX size={16} />,
        loading: false,
        withCloseButton: true,
      });
    },
  });

  const handleDeletePart = () => {
    modals.openConfirmModal({
      title: 'Delete Part Confirmation',
      children: (
        <Text size="sm">
          This will delete the part named '{name}', along with its associated
          questions and answer keys.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        notifications.show({
          message: 'Loading...',
          id: 'part-delete',
          loading: true,
          autoClose: false,
          withCloseButton: false,
        });
        deletePart({ formId, partId });
      },
    });
  };

  return (
    <PartWrapper
      name={name}
      order={order}
      onAddPartBelow={handleAddPartBelow}
      onEditPart={handleEditPart}
      onDeletePart={handleDeletePart}
    >
      Questions
    </PartWrapper>
  );
}
