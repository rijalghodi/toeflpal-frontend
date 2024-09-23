import { ActionIcon, Button, Group, Paper, Stack, Title } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { useDrawer } from '@/contexts';
import { AudioPlayer, LabelValuePairs, ReadTriggerButton } from '@/elements';
import { formGet, formGetKey } from '@/services';

import { FormGeneralUpdate } from './FormGeneralUpdate';

type Props = {
  formId: string;
};

export function FormGeneralInfo({ formId }: Props) {
  const { open, close } = useDrawer();
  const { data, isLoading } = useQuery({
    queryKey: formGetKey({ formId }),
    queryFn: () => formGet({ formId }),
    enabled: !!formId,
  });

  const handleUpdateFormGeneral = () => {
    open({
      title: 'Change Form General Information',
      content: (
        <FormGeneralUpdate
          formId={formId}
          initValues={{
            name: data?.data.name,
            duration: data?.data.duration as number,
            allowReview: data?.data.allowReview as boolean,
            instructionAudioUrl: data?.data.instructionAudio?.url,
            instruction: data?.data.instruction as string,
            closingAudioUrl: data?.data.closingAudio?.url,
            closing: data?.data.closing as string,
          }}
          onSuccess={() => close()}
        />
      ),
    });
  };

  const renderReadAndAudio = (
    read: { title: string; content?: string },
    audio: { src?: string },
  ) =>
    read.content || audio.src ? (
      <Group gap="sm">
        {read.content && (
          <ReadTriggerButton content={read.content} title={read.title} />
        )}
        {audio.src && (
          <AudioPlayer src={audio.src} miw={100} maw={300} flex={1} />
        )}
      </Group>
    ) : (
      'None'
    );
  return (
    <Paper withBorder p="md" radius="md">
      <Group align="flex-start" justify="space-between" w="100%">
        <Stack gap={12} flex={1}>
          <Group>
            <Title order={2} fz="xs" fw={700} tt="uppercase">
              General Information
            </Title>
            <ActionIcon
              hiddenFrom="sm"
              variant="subtle"
              color="dark"
              size="xs"
              disabled={!!isLoading}
              onClick={handleUpdateFormGeneral}
            >
              <IconEdit size={12} />
            </ActionIcon>
          </Group>
          <LabelValuePairs
            labelMinWidth={140}
            data={[
              { label: 'Name', value: data?.data.name },
              { label: 'Skill', value: data?.data.skillType.toUpperCase() },
              {
                label: 'Duration (minutes)',
                value: data?.data.duration?.toString(),
              },
              {
                label: 'Allow Review',
                value: data?.data.allowReview ? 'Yes' : 'No',
              },
              {
                label: 'Instruction',
                value: renderReadAndAudio(
                  {
                    content: data?.data.instruction ?? '',
                    title: data?.data.name ?? 'Instruction',
                  },
                  {
                    src: data?.data.instructionAudio?.url,
                  },
                ),
              },
              {
                label: 'Closing',
                value: renderReadAndAudio(
                  {
                    content: data?.data.closing ?? '',
                    title: data?.data.name ?? 'Instruction',
                  },
                  {
                    src: data?.data.closingAudio?.url,
                  },
                ),
              },
            ]}
          />
        </Stack>
        <Button
          variant="default"
          size="xs"
          disabled={!!isLoading}
          onClick={handleUpdateFormGeneral}
          visibleFrom="sm"
        >
          Change
        </Button>
      </Group>
    </Paper>
  );
}
