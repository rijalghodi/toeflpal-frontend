'use client';

import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { LoadingState } from '@/elements';
import { ReadingFormPresenter } from '@/features/simulation';
import { formGet, formGetKey } from '@/services';
import { SkillType } from '@/services/types';
import { routes } from '@/utils/constant/routes';

export default function FormPreviewPage() {
  const { formId } = useParams();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: formGetKey({ formId: formId as string }),
    queryFn: () => formGet({ formId: formId as string }),
    enabled: !!formId,
  });

  const handleQuit = () => {
    modals.openConfirmModal({
      title: 'Quit Confirmation',
      children: (
        <Text size="sm" c="dimmed">
          Are you sure you want to quit the test? You will lose all your current
          data for this section.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        router.push(routes.formEditor(formId as string));
      },
    });
  };

  if (isLoading) {
    return <LoadingState h="calc(100vh)" />;
  }

  if (
    data?.data.skillType === SkillType.Reading ||
    data?.data.skillType === SkillType.Grammar
  ) {
    return (
      <ReadingFormPresenter
        formId={formId as string}
        name={data.data.name}
        onQuit={handleQuit}
      />
    );
  }
  return <div>SimulationRouter</div>;
}
