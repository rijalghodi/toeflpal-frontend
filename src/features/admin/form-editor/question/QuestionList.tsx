import { ActionIcon, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { truncate } from 'lodash';
import { DataTable } from 'mantine-datatable';
import React from 'react';

import { useDrawer } from '@/contexts';
import { LoadingState } from '@/elements';
import {
  questionAndKeyListInPart,
  questionAndKeyListInPartKey,
} from '@/services';
import { questionDelete } from '@/services/question/question-delete';

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
    queryKey: questionAndKeyListInPartKey({ formId, partId }),
    queryFn: () => questionAndKeyListInPart({ formId, partId }),
  });

  const handleUpdateQuestion = (questionId: string) => {
    const question = questions?.data.find((q) => q.id === questionId);
    openDrawer({
      title: `Update Question ${question?.order}`,
      content: (
        <QuestionUpdate
          questionId={questionId}
          initValues={{
            text: question?.text,
            audioUrl: question?.audio?.url,
            referenceId: question?.reference?.id,
            referenceName: question?.reference?.name,
            readingReferenceDetail: question?.readingReferenceDetail,
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
      minHeight={180}
      noRecordsText="No Question"
      fetching={isLoading || isFetching}
      withRowBorders
      highlightOnHover
      verticalSpacing="xs"
      horizontalSpacing="sm"
      onRowClick={({ record }) => handleUpdateQuestion(record.id)}
      columns={[
        { accessor: 'no', title: 'No', width: 30, textAlign: 'center' },
        {
          accessor: 'text',
          title: 'Question',
          ellipsis: true,
          width: 300,
        },
        {
          accessor: 'answerKey',
          title: 'Key',
          ellipsis: true,
          textAlign: 'center',
          width: 40,
          render: ({ answerKey }) =>
            answerKey ? <IconCheck size={16} color="#5c7cfa" /> : null,
        },
        {
          accessor: 'audio',
          width: 50,
          title: 'Audio',
          textAlign: 'center',
          render: ({ audio }) =>
            audio ? <IconCheck size={16} color="#5c7cfa" /> : null,
        },
        {
          accessor: 'reference',
          title: 'Reference',
          ellipsis: true,
          width: 100,
        },
        {
          accessor: 'actions',
          title: '',
          textAlign: 'center',
          width: 40,
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
        audio: item.audio?.url,
        reference: item.reference?.name,
        id: item.id,
        answerKey: item.key?.option?.id,
      }))}
    />
  );
}
