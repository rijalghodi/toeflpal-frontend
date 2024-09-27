import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Switch,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { AudioInput, RichTextEditorInput } from '@/elements';
import { formdUpdate, formGetKey } from '@/services';

import {
  FormUpdateFormValues,
  formUpdateSchema,
} from '../schemas/form-update.schmema';

type Props = {
  formId: string;
  initValues?: {
    name?: string;
    duration?: number;
    allowReview?: boolean;
    instruction?: string;
    instructionAudioUrl?: string;
    closing?: string;
    closingAudioUrl?: string;
  };
  onSuccess?: () => void;
};
export function FormGeneralUpdate({ initValues, formId, onSuccess }: Props) {
  const q = useQueryClient();
  // React Hook Form
  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty },
  } = useForm<FormUpdateFormValues>({
    defaultValues: {
      name: initValues?.name || '',
      duration: initValues?.duration || 0,
      allowReview: initValues?.allowReview || false,
      instruction: initValues?.instruction || '',
      instructionAudio: null,
      closing: initValues?.closing || '',
      closingAudio: null,
    },
    resolver: zodResolver(formUpdateSchema),
  });

  // Update TOEFL
  const { mutateAsync: updateToefl, isPending } = useMutation({
    mutationFn: formdUpdate,
    onSuccess: () => {
      q.refetchQueries({ queryKey: formGetKey({ formId }) });
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

  const handleSubmitForm = handleSubmit(async (data) => {
    notifications.show({
      message: 'Loading...',
      id: 'update-toefl-update',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    await updateToefl({ formId, ...data });
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
          name="duration"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Duration (minutes)"
              placeholder="Input here"
              {...field}
            />
          )}
        />
        <Controller
          name="allowReview"
          control={control}
          render={({ field: { value, onChange, ...other } }) => (
            <Switch
              label="Allow Review"
              placeholder="Input here"
              checked={value}
              onChange={(event) => onChange(event.currentTarget.checked)}
              {...other}
            />
          )}
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
              placeholder="Click here"
              mah={200}
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
              defaultUrl={initValues?.instructionAudioUrl}
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
