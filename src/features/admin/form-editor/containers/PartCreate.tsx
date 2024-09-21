import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Paper, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { AudioInput, RichTextEditorInput } from '@/elements';
import { partCreate, partListKey } from '@/services';

import {
  PartCreateFormValues,
  partCreateSchema,
} from '../schemas/part-create-schema';

type Props = {
  formId: string;
  order: number;
  onSuccess?: () => void;
};
export function PartCreate({ order, formId, onSuccess }: Props) {
  const q = useQueryClient();
  // React Hook Form
  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty },
  } = useForm<PartCreateFormValues>({
    defaultValues: {
      name: '',
      instruction: '',
      instructionAudio: null,
      closing: '',
      closingAudio: null,
    },
    resolver: zodResolver(partCreateSchema),
  });

  // Update TOEFL
  const { mutateAsync: createPart, isPending } = useMutation({
    mutationFn: partCreate,
    onSuccess: () => {
      q.refetchQueries({ queryKey: partListKey({ formId }) });
      notifications.update({
        message: 'Success',
        id: 'part-create',
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
        id: 'part-create',
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
      id: 'part-create',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    await createPart({ formId, ...data, order: order });
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
