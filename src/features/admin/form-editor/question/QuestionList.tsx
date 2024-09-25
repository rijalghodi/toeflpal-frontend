import { ActionIcon, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconTrash, IconX } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { truncate } from 'lodash';
import { DataTable } from 'mantine-datatable';
import React from 'react';

import { useDrawer } from '@/contexts';
import { AudioTriggerButton, LoadingState } from '@/elements';
import { questionDelete } from '@/services/question/question-delete';
import {
  questionListInPart,
  questionListInPartKey,
} from '@/services/question/question-list-in-part';

import { QuestionUpdate } from './QuestionUpdate';

type Props = {
  formId: string;
  partId: string;
  lastOrder?: number;
};
export function QuestionList({ formId, partId, lastOrder }: Props) {
  const { open: openDrawer, close: closeDrawer } = useDrawer();

  const {
    data: questions,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: questionListInPartKey({ formId, partId }),
    queryFn: () => questionListInPart({ formId, partId }),
  });

  const handleUpdateQuestion = (questionId: string) => {
    const question = questions?.data.find((q) => q.id === questionId);
    openDrawer({
      title: 'Update Question',
      content: (
        <QuestionUpdate
          questionId={questionId}
          initValues={{
            text: question?.text,
            audioUrl: question?.audio?.url,
            referenceId: question?.reference?.id,
            referenceName: question?.reference?.name,
          }}
          onSuccess={() => {
            refetch();
          }}
          onClose={closeDrawer}
        />
      ),
      size: '100vw',
    });
  };

  const { mutateAsync: deleteQuestion } = useMutation({
    mutationFn: questionDelete,
    onSuccess: () => {
      refetch();
      notifications.hide('question-delete');
    },
    onError: () => {
      notifications.update({
        message: 'Fail to delete question',
        id: 'question-delete',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 3000,
        withCloseButton: true,
        loading: false,
      });
    },
  });

  const handleDelete = async (questionId: string, name?: string) => {
    modals.openConfirmModal({
      title: 'Delete Question Confirmation',
      children: (
        <Text size="sm" c="dimmed">
          This will delete the question '
          {truncate(name, { length: 50, omission: '...' })}', along with its
          associated options and answer key.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        notifications.show({
          message: 'Loading...',
          id: 'question-delete',
          loading: true,
          autoClose: false,
          withCloseButton: false,
        });
        await deleteQuestion({ questionId });
      },
    });
  };

  if (isLoading) return <LoadingState h={200} />;

  return (
    <DataTable
      minHeight={100}
      noRecordsText="No Question"
      fetching={isLoading || isFetching}
      withRowBorders
      striped
      highlightOnHover
      verticalSpacing="xs"
      horizontalSpacing="sm"
      onRowClick={({ record }) => handleUpdateQuestion(record.id)}
      columns={[
        { accessor: 'no', title: 'No', width: 50 },
        { accessor: 'text', title: 'Question', ellipsis: true },
        {
          accessor: 'audio',
          width: 100,
          title: 'Audio',
          textAlign: 'center',
        },
        {
          accessor: 'reference',
          title: 'Reference',
          ellipsis: true,
          width: 150,
        },
        {
          accessor: 'actions',
          title: 'Action',
          textAlign: 'center',
          width: 100,
          render: (item) => (
            <Group gap={4} justify="center" wrap="nowrap">
              <ActionIcon
                size="lg"
                radius="xl"
                variant="subtle"
                color="dark"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id, item.text);
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={questions?.data?.map((item) => ({
        no: (lastOrder ?? 0) + item.order,
        text: new DOMParser()
          .parseFromString(item.text || '', 'text/html')
          .body.textContent?.trim(),
        audio: item.audio?.url ? (
          <AudioTriggerButton
            src={item.audio.url}
            title={`Question ${item.order}`}
          />
        ) : (
          '-'
        ),
        reference: item.reference?.name,
        id: item.id,
      }))}
    />
  );
}
