import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Paper, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { AudioInput, RichTextEditorInput } from '@/elements';
import { partListKey, partUpdate } from '@/services';

import {
  PartCreateFormValues,
  partCreateSchema,
} from '../schemas/part-create-schema';

type Props = {
  formId: string;
  partId: string;
  onSuccess?: () => void;
  initValues?: {
    name?: string;
    instruction?: string;
    instructionAudioUrl?: string;
    closing?: string;
    closingAudioUrl?: string;
  };
};
export function PartUpdate({ initValues, formId, partId, onSuccess }: Props) {
  const q = useQueryClient();
  // React Hook Form
  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty },
  } = useForm<PartCreateFormValues>({
    defaultValues: {
      name: initValues?.name || '',
      instruction: initValues?.instruction || '',
      instructionAudio: null,
      closing: initValues?.closing || '',
      closingAudio: null,
    },
    resolver: zodResolver(partCreateSchema),
  });

  const { mutateAsync: updatePart, isPending } = useMutation({
    mutationFn: partUpdate,
    onSuccess: () => {
      q.refetchQueries({ queryKey: partListKey({ formId }) });
      notifications.update({
        message: 'Success',
        id: 'part-update',
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
        id: 'part-update',
        color: 'red',
        autoClose: 5000,
        icon: <IconX size={16} />,
        loading: false,
      });
    },
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    notifications.show({
      message: 'Loading...',
      id: 'part-update',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    await updatePart({ formId, ...data, partId });
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
          name="instruction"
          control={control}
          render={({ field }) => (
            <RichTextEditorInput
              label="Instruction"
              placeholder="Click here"
              mah={200}
              {...field}
            />
          )}
        />
        <Controller
          name="instructionAudio"
          control={control}
          render={({ field }) => (
            <AudioInput
              label="Instruction Audio"
              placeholder="Click here"
              defaultUrl={initValues?.instructionAudioUrl}
              {...field}
            />
          )}
        />
        <Controller
          name="closing"
          control={control}
          render={({ field }) => (
            <RichTextEditorInput
              label="Closing"
              mah={200}
              placeholder="Click here"
              {...field}
            />
          )}
        />
        <Controller
          name="closingAudio"
          control={control}
          render={({ field }) => (
            <AudioInput
              label="Closing Audio"
              placeholder="Click here"
              defaultUrl={initValues?.closingAudioUrl}
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
