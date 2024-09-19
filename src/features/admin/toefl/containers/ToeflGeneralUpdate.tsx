import { Button, Group, Paper, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { toeflGetKey, toeflUpdate } from '@/services';

type Props = {
  toeflId: string;
  initValues: {
    name?: string;
    description?: string;
  };
  onSuccess?: () => void;
};
export function ToeflGeneralUpdate({ initValues, toeflId, onSuccess }: Props) {
  const q = useQueryClient();
  // React Hook Form
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: initValues.name || '',
      description: initValues.description || '',
    },
  });

  // Update TOEFL
  const { mutateAsync: updateToefl, isPending } = useMutation({
    mutationFn: toeflUpdate,
    onSuccess: () => {
      q.refetchQueries({ queryKey: toeflGetKey({ toeflId }) });
      notifications.update({
        message: 'Success',
        id: 'update-toefl-update',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 3000,
        loading: false,
      });
      onSuccess?.();
    },
    onError: () => {
      notifications.update({
        message: 'Fail',
        id: 'update-toefl-update',
        color: 'red',
        autoClose: 5000,
        icon: <IconX size={16} />,
        loading: false,
      });
    },
  });

  const handleSubmitForm = handleSubmit((data) => {
    notifications.show({
      message: 'Loading...',
      id: 'update-toefl-update',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    updateToefl({ toeflId, ...data });
  });

  return (
    <Stack component="form" onSubmit={handleSubmitForm}>
      <TextInput label="Name" placeholder="Input here" {...register('name')} />
      <TextInput
        label="Description"
        placeholder="Input here"
        {...register('description')}
      />
      <Paper
        withBorder
        pos="absolute"
        bottom={0}
        left={0}
        right={0}
        radius={0}
        p="xs"
      >
        <Group justify="flex-end" w="100%">
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
        </Group>
      </Paper>
    </Stack>
  );
}
