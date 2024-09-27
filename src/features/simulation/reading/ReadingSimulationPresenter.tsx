'use client';

import { AppShell, Drawer, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { LoadingState } from '@/elements';
import { attemptGet, attemptGetKey } from '@/services/attempt/attempt-get';
import { formGetFull, formGetFullKey } from '@/services/form/form-get-full';

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
  onStart?: () => Promise<any>;
  onNext?: () => void;
  onPrev?: () => void;
  name?: string | ((formName?: string) => string);
  onSubmit?: (
    answers: { optionId?: string; questionId: string }[],
    formId: string,
  ) => Promise<any>;
  onFinsih?: () => void;
  disabledNavigation?: boolean;
  preview?: boolean;
};

export function ReadingSimulationPresenter({ formId, ...props }: Props) {
  // --- Get form data ---
  const { data: dataForm, isLoading: loadingForm } = useQuery({
    queryKey: formGetFullKey({ formId }),
    queryFn: () => formGetFull({ formId }),
    enabled: !!formId,
  });

  const questions = dataForm?.data.questions;
  const parts = dataForm?.data.parts;
  const form = dataForm?.data;

  // --- Get attempt data ---
  const { data: attempt, isLoading: loadingAttempt } = useQuery({
    queryKey: attemptGetKey({ formId }),
    queryFn: () => attemptGet({ formId }),
    enabled: !!formId && !props.preview,
  });

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

  const answers = attempt?.data.answers;
  const questionAndAnswers = questions?.map((q) => [
    q.id,
    answers?.find((a) => a.question?.id === q.id)?.option?.id,
  ]);

  const questionObj = Object.fromEntries(questionAndAnswers ?? []);

  const { getValues, control } = useForm({
    defaultValues: questionObj,
  });

  const handleSubmit = async () => {
    const inp = getValues();
    const userAns = Object.entries(inp).map(([questionId, optionId]) => ({
      questionId,
      optionId: optionId as string | undefined,
    }));
    await props.onSubmit?.(userAns, formId);
  };

  if (loadingAttempt || loadingForm) {
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
          name={form?.name}
          humanizedStep={humanizedStep}
          step={currentStep}
          onNext={goNext}
          onPrev={goPrev}
          onQuit={props.onQuit}
          onReview={openQuestionNav}
          onStart={props.onStart}
          onSubmit={handleSubmit}
          duration={
            attempt?.data.remainingTime && attempt.data.remainingTime > 0
              ? attempt.data.remainingTime
              : undefined
          }
        />
      </AppShell.Header>

      <AppShell.Main>
        <form>
          <Tabs value={currentStep}>
            {/* Form Start */}
            <Tabs.Panel value="formstart">
              <FormStartPanel
                text={form?.instruction ?? undefined}
                onStart={props.onStart}
              />
            </Tabs.Panel>

            {/* Form End */}
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
                  reference={question.readingReferenceDetail}
                  questionId={question.id}
                  control={control}
                />
              </Tabs.Panel>
            ))}
          </Tabs>
        </form>

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
