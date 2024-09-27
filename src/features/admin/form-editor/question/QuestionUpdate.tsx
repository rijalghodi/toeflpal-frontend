import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Group,
  InputWrapper,
  Paper,
  SimpleGrid,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { AudioInput, RichTextEditorInput } from '@/elements';
import { questionUpdate } from '@/services';

import { OptionList } from './OptionList';
import { ReferenceSelect } from './ReferenceSelect';
import {
  QuestionUpdateFormValues,
  questionUpdateSchema,
} from './schemas/question-update.schema';

type Props = {
  questionId: string;
  onSuccess?: () => void;
  onClose?: () => void;
  initValues?: {
    text?: string;
    audioUrl?: string;
    referenceId?: string;
    referenceName?: string;
    readingReferenceDetail?: string;
  };
};

export function QuestionUpdate({
  onSuccess,
  questionId,
  initValues,
  onClose,
}: Props) {
  // React Hook Form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<QuestionUpdateFormValues>({
    defaultValues: {
      text: initValues?.text || '',
      audio: null,
      referenceId: initValues?.referenceId,
      readingReferenceDetail: initValues?.readingReferenceDetail,
    },
    resolver: zodResolver(questionUpdateSchema),
  });

  const watchedValues = useWatch({ control }); // Watching form values

  // Update TOEFL
  const { mutateAsync: updateQuestion, isPending } = useMutation({
    mutationFn: questionUpdate,
    onSuccess: () => {
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
    await updateQuestion({ questionId, ...data });
  });

  // Debounce the submit function
  const debouncedSubmit = useCallback(
    debounce((data) => {
      handleSubmitForm(data);
    }, 2000), // 2 seconds debounce
    [handleSubmitForm],
  );

  useEffect(() => {
    if (isDirty) {
      debouncedSubmit(watchedValues);
    }
    return () => {
      debouncedSubmit.cancel();
    };
  }, [watchedValues]); // eslint-disable-

  const [versionRichTextEditor, setVersionRichTextEditor] = useState(1000);

  return (
    <form>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 'lg', md: 40 }}>
        <Stack gap="md">
          <Controller
            name="referenceId"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <ReferenceSelect
                label="Reference"
                placeholder="Click here"
                initValues={{
                  id: initValues?.referenceId ?? '',
                  name: initValues?.referenceName ?? 'No Name',
                }}
                onChange={(value, longText) => {
                  onChange(value);
                  setValue('readingReferenceDetail', longText);
                  setVersionRichTextEditor((prevVersion) => prevVersion + 1);
                }}
                {...field}
              />
            )}
          />
          <Controller
            name="readingReferenceDetail"
            control={control}
            render={({ field }) => (
              <RichTextEditorInput
                label="Text Reference Detail"
                placeholder="Type here"
                version={versionRichTextEditor}
                {...field}
              />
            )}
          />
        </Stack>
        <Stack gap="md">
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <RichTextEditorInput
                label="Question"
                placeholder="Type here"
                {...field}
              />
            )}
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
          <InputWrapper label="Options & Answer Key">
            <OptionList questionId={questionId} />
          </InputWrapper>
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
          <Button type="button" loading={isPending} onClick={onClose}>
            {isPending ? 'Saving' : 'Finish'}
          </Button>
        </Group>
      </Paper>
    </form>
  );
}
