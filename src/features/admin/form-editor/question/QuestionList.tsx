import { ActionIcon, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import React from 'react';

import { useDrawer } from '@/contexts';
import { AudioTriggerButton, LoadingState } from '@/elements';
import { questionList, questionListKey } from '@/services';

import { QuestionUpdate } from './QuestionUpdate';

type Props = {
  formId: string;
  partId: string;
};
export function QuestionList({ formId, partId }: Props) {
  const { open: openDrawer, close: closeDrawer } = useDrawer();
  const {
    data: questions,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: questionListKey({ formId, partId }),
    queryFn: () => questionList({ formId, partId }),
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
          }}
          onSuccess={() => {
            refetch();
            closeDrawer();
          }}
        />
      ),
      size: '100vw',
    });
  };

  if (isLoading) return <LoadingState h={200} />;

  return (
    <DataTable
      minHeight={100}
      noRecordsText="No Question"
      noHeader
      fetching={isLoading || isFetching}
      withRowBorders
      striped
      highlightOnHover
      verticalSpacing="xs"
      horizontalSpacing="sm"
      onRowClick={({ record }) => handleUpdateQuestion(record.id)}
      columns={[
        { accessor: 'no', title: 'No', width: 50 },
        { accessor: 'text', title: 'Question' },
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
                size="sm"
                variant="subtle"
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={questions?.data?.map((item, idx) => ({
        no: item.order,
        text: item.text,
        audio: item.audio?.url ? (
          <AudioTriggerButton src={item.audio.url} />
        ) : (
          '-'
        ),
        reference: item.reference?.name,
        id: item.id,
      }))}
    />
  );
}
