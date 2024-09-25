'use client';

import { AppShell, Drawer, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { LoadingState } from '@/elements';
import { formGetFull, formGetFullKey } from '@/services/form/form-get-full';
import { Answer } from '@/services/types';

import { QuestionNavigation } from '../common/QuestionNavigation';
import { useSimulNavigation } from '../common/useSimulNavigation';
import { FormEndPanel } from './FormEndPanel';
import { FormStartPanel } from './FormStartPanel';
import { PartPanel } from './PartPanel';
import { QuestionPanel } from './QuestionPanel';
import { ReadingSimulationHeader } from './ReadingSimulationHeader';

// import { FormEditorMain } from './FormEditorMain';

type Props = {
  formId: string;
  onQuit?: () => void;
  onStart?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  name?: string | ((formName?: string) => string);
  onSubmit?: (answers: Answer[], formId: string) => void;
  onFinsih?: () => void;
};

export function ReadingFormPresenter({ formId, ...props }: Props) {
  // --- Get form data ---
  const { data, isLoading } = useQuery({
    queryKey: formGetFullKey({ formId }),
    queryFn: () => formGetFull({ formId }),
  });

  const questions = data?.data.questions;
  const parts = data?.data.parts;
  const form = data?.data;

  // --- Prvent user for quiting ---
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = ''; // Required for some browsers
      return '';
    };

    // Adding the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // --- Question Navigation ---
  const { goNext, goPrev, jumpTo, currentStep, humanizedStep } =
    useSimulNavigation({
      partLength: form?.partLength ?? 0,
      questionLengthPerPart: form?.questionLengthPerPart ?? [],
    });

  // --- Question Navigation Drawer --
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
        <ReadingSimulationHeader
          name={
            typeof props.name === 'string'
              ? props.name
              : props.name?.(form?.name)
          }
          step={humanizedStep}
          onNext={goNext}
          onPrev={goPrev}
          onQuit={props.onQuit}
          onReview={openQuestionNav}
        />
      </AppShell.Header>

      <AppShell.Main>
        <Tabs value={currentStep}>
          {/* Form Start */}
          <Tabs.Panel value="formstart">
            <FormStartPanel
              text={form?.instruction ?? undefined}
              onStart={props.onStart}
            />
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
