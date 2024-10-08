import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Paper, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { AudioInput, RichTextEditorInput } from '@/elements';
import { referenceUpdate } from '@/services';

import {
  ReferenceCreateFormValues,
  referenceCreateSchema,
} from './schemas/reference-create.schema';

type Props = {
  referenceId: string;
  onSuccess?: () => void;
  initValues?: {
    name?: string;
    text?: string;
    audioUrl?: string;
  };
};
export function ReferenceUpdate({ onSuccess, referenceId, initValues }: Props) {
  // React Hook Form
  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty },
  } = useForm<ReferenceCreateFormValues>({
    defaultValues: {
      name: initValues?.name || '',
      text: initValues?.text || '',
      audio: null,
    },
    resolver: zodResolver(referenceCreateSchema),
  });

  // Update TOEFL
  const { mutateAsync: updatePart, isPending } = useMutation({
    mutationFn: referenceUpdate,
    onSuccess: () => {
      notifications.update({
        message: 'Success',
        id: 'reference-update',
        color: 'green',
        icon: <IconCheck size={16} />,
        autoClose: 3000,
        loading: false,
        withCloseButton: true,
      });
      onSuccess?.();
    },
    onError: () => {
      notifications.update({
        message: 'Fail',
        id: 'reference-update',
        color: 'red',
        autoClose: 5000,
        icon: <IconX size={16} />,
        loading: false,
        withCloseButton: true,
      });
    },
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    notifications.show({
      message: 'Loading...',
      id: 'reference-update',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    await updatePart({ ...data, referenceId });
  });

  return (
    <form onSubmit={handleSubmitForm}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Input here"
          {...register('name')}
        />
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <RichTextEditorInput
              label="Text Reference"
              placeholder="Click here"
              mah={400}
              {...field}
            />
          )}
        />
        <Controller
          name="audio"
          control={control}
          render={({ field }) => (
            <AudioInput
              label="Audio Reference"
              placeholder="Click here"
              defaultUrl={initValues?.audioUrl}
              {...field}
            />
          )}
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
            <Button type="submit" loading={isPending} disabled={!isDirty}>
              Submit
            </Button>
          </Group>
        </Paper>
      </Stack>
    </form>
  );
}
