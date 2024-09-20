import { Button, Group, Paper, Stack, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import {
  AudioTriggerButton,
  KeyValuePairs,
  ReadTriggerButton,
} from '@/elements';
import { formGet, formGetKey } from '@/services';

type Props = {
  formId: string;
};

export function FormGeneralInfo({ formId }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: formGetKey({ formId }),
    queryFn: () => formGet({ formId }),
    enabled: !!formId,
  });

  const handleUpdateFormGeneral = () => {};

  const renderAudioTextGroup = (audioSrc?: string, text?: string) => (
    <Group>
      {audioSrc && <AudioTriggerButton src={audioSrc} />}
      {text && <ReadTriggerButton content={text} />}
    </Group>
  );

  return (
    <Paper withBorder p="md" radius="md">
      <Group align="flex-start" justify="space-between" w="100%">
        <Stack gap={12}>
          <Title order={2} fz="xs" fw={500} tt="uppercase" c="primary">
            General Information
          </Title>
          <KeyValuePairs
            keyMinWidth={140}
            data={[
              { key: 'Name', value: data?.data.name },
              { key: 'Duration', value: data?.data.duration?.toString() },
              {
                key: 'Allow Review',
                value: data?.data.allowReview ? 'Yes' : 'No',
              },
              {
                key: 'Instruction',
                value: renderAudioTextGroup(
                  data?.data.instructionAudio?.url,
                  data?.data.instruction ?? '',
                ),
              },
              {
                key: 'Closing',
                value: renderAudioTextGroup(
                  data?.data.closingAudio?.url,
                  data?.data.closing ?? '',
                ),
              },
            ]}
          />
        </Stack>
        <Button
          variant="default"
          size="xs"
          disabled={isLoading}
          onClick={handleUpdateFormGeneral}
        >
          Change
        </Button>
      </Group>
    </Paper>
  );
}
