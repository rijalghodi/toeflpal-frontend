import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Textarea,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { AudioInput } from '@/elements';
import { questionUpdate } from '@/services';

import { ReferenceInput } from './ReferenceInput';
import {
  QuestionUpdateFormValues,
  questionUpdateSchema,
} from './schemas/question-update.schema';

type Props = {
  questionId: string;
  onSuccess?: () => void;
  initValues?: {
    text?: string;
    audioUrl?: string;
    referenceId?: string;
  };
};
export function QuestionUpdate({ onSuccess, questionId, initValues }: Props) {
  const q = useQueryClient();
  // React Hook Form
  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty },
  } = useForm<QuestionUpdateFormValues>({
    defaultValues: {
      text: initValues?.text || '',
      audio: null,
      referenceId: initValues?.referenceId,
    },
    resolver: zodResolver(questionUpdateSchema),
  });

  // Update TOEFL
  const { mutateAsync: updateQuestion, isPending } = useMutation({
    mutationFn: questionUpdate,
    onSuccess: () => {
      // q.invalidateQueries({ queryKey: questionListKey({ formId, partId }) });
      notifications.update({
        message: 'Success',
        id: 'question-update',
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
        id: 'question-update',
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
      id: 'question-update',
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    await updateQuestion({ questionId, ...data });
  });

  return (
    <form onSubmit={handleSubmitForm}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Stack gap="md">
          <Controller
            name="referenceId"
            control={control}
            render={({ field }) => (
              <ReferenceInput
                label="Reference"
                placeholder="Click here"
                {...field}
              />
            )}
          />
        </Stack>
        <Stack gap="md">
          <Textarea
            label="Question"
            placeholder="Input here"
            {...register('text')}
          />
          <Controller
            name="audio"
            control={control}
            render={({ field }) => (
              <AudioInput
                label="Audio Question (Optional)"
                placeholder="Click here"
                {...field}
              />
            )}
          />
        </Stack>
      </SimpleGrid>

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
    </form>
  );
}
