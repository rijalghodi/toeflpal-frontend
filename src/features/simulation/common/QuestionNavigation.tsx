import { Container, Pill } from '@mantine/core';
import { IconBookmarkFilled } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import React from 'react';

import { LoadingState } from '@/elements';
import { questionList, questionListKey } from '@/services';

type QuestionNav = {
  order?: number;
  text?: string;
  id: string;
  part?: number;
  step: string;
  status: string;
  marked?: boolean;
};
type Props = {
  onClickQuestion?: (q: QuestionNav) => void;
  formId: string;
};
export function QuestionNavigation({ onClickQuestion, formId }: Props) {
  // Get questions
  const { data: questions, isLoading } = useQuery({
    queryKey: questionListKey({ formId }),
    queryFn: () => questionList({ formId }),
    enabled: !!formId,
  });
  // Get user answer
  //

  if (isLoading) return <LoadingState h="calc(100vh - 40px)" />;

  return (
    <Container mx="auto" maw={1200}>
      <DataTable
        minHeight={300}
        noRecordsText="No Question"
        fetching={false}
        withRowBorders
        striped
        highlightOnHover
        verticalSpacing="xs"
        horizontalSpacing="sm"
        onRowClick={({ record }) => onClickQuestion?.(record)}
        columns={[
          { accessor: 'order', title: 'No', width: 50 },
          { accessor: 'text', title: 'Question', ellipsis: true },
          {
            accessor: 'status',
            title: 'Status',
            textAlign: 'center',
            render: ({ status }) =>
              status === 'answered' ? (
                <Pill color="green">Answered</Pill>
              ) : (
                <Pill>Not Answered</Pill>
              ),
          },
          {
            accessor: 'marked',
            title: 'Marked',
            textAlign: 'center',
            render: ({ marked }) =>
              marked ? <IconBookmarkFilled size={16} color="#7950f2" /> : '',
          },
        ]}
        records={
          questions?.data.map(({ order, text, id, part }, idx) => ({
            id: id,
            order: idx + 1,
            step: `question-p${part?.order}q${order}`,
            part: part?.order,
            text: new DOMParser()
              .parseFromString(text || '', 'text/html')
              .body.textContent?.trim(),
            status: 'pending', // find in attempt
            marked: false, // fnnd in attempt
          })) ?? ([] as QuestionNav[])
        }
      />
    </Container>
  );
}
