import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

import { LoadingState } from '@/elements';
import { formGet, formGetKey } from '@/services';
import { SkillType } from '@/services/types';

import { TextSimulationShell } from './text/TextSimulationShell';

export function SimulationRouter() {
  const { formId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: formGetKey({ formId: formId as string }),
    queryFn: () => formGet({ formId: formId as string }),
    enabled: !!formId,
  });

  if (isLoading) {
    return <LoadingState h="calc(100vh)" />;
  }

  if (data?.data.skillType === SkillType.Reading) {
    return (
      <TextSimulationShell
        formId={formId as string}
        name={data.data.name}
        duration={data.data.duration ?? 0}
      />
    );
  }
  return <div>SimulationRouter</div>;
}
