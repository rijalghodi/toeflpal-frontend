'use client';

import { AppShell, Drawer, Tabs, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

import { LoadingState } from '@/elements';
import { formGetFull, formGetFullKey } from '@/services/form/form-get-full';

import { QuestionNavigation } from '../common/QuestionNavigation';
import { useSimulNavigation } from '../common/useSimulNavigation';
import { FormEndPanel } from './FormEndPanel';
import { FormStartPanel } from './FormStartPanel';
import { PartPanel } from './PartPanel';
import { QuestionPanel } from './QuestionPanel';
import { TextSimulationHeader } from './TextSimulationHeader';

// import { FormEditorMain } from './FormEditorMain';

type Props = {
  formId: string;
  name?: string;
  duration?: number;
};

export function TextSimulationShell({ formId, name, duration }: Props) {
  const router = useRouter();

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
        router.back();
      },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: formGetFullKey({ formId }),
    queryFn: () => formGetFull({ formId }),
  });

  const questions = data?.data.questions;
  const parts = data?.data.parts;
  const form = data?.data;

  const { goNext, goPrev, jumpTo, currentStep, humanizedStep } =
    useSimulNavigation({
      partLength: form?.partLength ?? 0,
      questionLengthPerPart: form?.questionLengthPerPart ?? [],
    });

  const [
    questionNavOpened,
    { open: openQuestionNav, close: closeQuestionNav },
  ] = useDisclosure(false);

  const handleJumpTo = (step: string) => {
    jumpTo(step);
    closeQuestionNav();
  };

  if (isLoading) {
    return <LoadingState h="100vh" />;
  }
  return (
    <AppShell
      header={{ height: 80, offset: true }}
      withBorder={false}
      px={{ base: 'md', xs: 'lg', md: 'xl' }}
    >
      <AppShell.Header bg="#fff">
        <TextSimulationHeader
          name={`Preview ${name}`}
          step={humanizedStep}
          onNext={goNext}
          onPrev={goPrev}
          onQuit={handleQuit}
          onReview={openQuestionNav}
        />
      </AppShell.Header>

      <AppShell.Main>
        <Tabs value={currentStep}>
          {/* Form Start */}
          <Tabs.Panel value="formstart">
            <FormStartPanel text={form?.instruction ?? undefined} />
          </Tabs.Panel>

          {/* Form Start */}
          <Tabs.Panel value="formend">
            <FormEndPanel text={form?.closing ?? undefined} />
          </Tabs.Panel>

          {/* Get all parts */}
          {parts?.map((part) => (
            <Tabs.Panel key={part.id} value={`part-p${part.order}`}>
              <PartPanel text={part?.instruction ?? undefined} />
            </Tabs.Panel>
          ))}

          {/* Questions */}
          {questions?.map((question, idx) => (
            <Tabs.Panel
              key={idx}
              value={`question-p${question.part?.order}q${question.order}`}
            >
              <QuestionPanel
                question={question.text ?? 'No Question'}
                options={question.options ?? []}
                reference={question.reference?.text}
              />
            </Tabs.Panel>
          ))}
        </Tabs>

        <Drawer
          opened={questionNavOpened}
          onClose={closeQuestionNav}
          size="100vw"
          position="right"
          title="Question Navigation"
          overlayProps={{
            opacity: 0.2,
          }}
          styles={{
            title: {
              fontWeight: 700,
              fontSize: 12,
              textTransform: 'uppercase',
            },
          }}
        >
          <QuestionNavigation
            formId={formId}
            onClickQuestion={(v) => handleJumpTo(v.step)}
          />
        </Drawer>
      </AppShell.Main>
    </AppShell>
  );
}
