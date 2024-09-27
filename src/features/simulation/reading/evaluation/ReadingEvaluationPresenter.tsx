'use client';

import { AppShell, Tabs } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { LoadingState } from '@/elements';
import { questionAndKeyList, questionAndKeyListKey } from '@/services';
import { attemptGet, attemptGetKey } from '@/services/attempt/attempt-get';
import { formGetFull, formGetFullKey } from '@/services/form/form-get-full';

import { QuestionAnswerPanel } from './QuestionAnswerPanel';
import { ReadingEvaluationHeader } from './ReadingEvaluationHeader';
import { useEvalNavigation } from './useEvalNavigation';

type Props = {
  formId: string;
  onQuit?: () => void;
};

export function ReadingEvaluationPresenter({ formId, ...props }: Props) {
  // --- Get form data ---
  const { data: form, isLoading: loadingForm } = useQuery({
    queryKey: formGetFullKey({ formId }),
    queryFn: () => formGetFull({ formId }),
    enabled: !!formId,
  });

  // --- Get attempt data ---
  const { data: attempt, isLoading: loadingAttempt } = useQuery({
    queryKey: attemptGetKey({ formId }),
    queryFn: () => attemptGet({ formId }),
    enabled: !!formId,
  });

  // --- Get question data ---
  const { data: questions } = useQuery({
    queryKey: questionAndKeyListKey({ formId }),
    queryFn: () => questionAndKeyList({ formId }),
    enabled: !!formId,
  });

  const { goNext, goPrev, currentStep, humanizedStep } = useEvalNavigation({
    partLength: form?.data.partLength ?? 0,
    questionLengthPerPart: form?.data.questionLengthPerPart ?? [],
  });

  const answers = attempt?.data.answers;

  const getUserAnswer = (questionId: string) =>
    answers?.find((a) => a.question?.id === questionId)?.option?.order;

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
        <ReadingEvaluationHeader
          name={form?.data.name}
          humanizedStep={humanizedStep}
          step={currentStep}
          onNext={goNext}
          onPrev={goPrev}
          onQuit={props.onQuit}
        />
      </AppShell.Header>

      <AppShell.Main>
        <form>
          <Tabs value={currentStep}>
            {questions?.data.map((question, idx) => (
              <Tabs.Panel
                key={idx}
                value={`question-p${question.part?.order}q${question.order}`}
              >
                <QuestionAnswerPanel
                  question={question.text ?? 'No Question'}
                  options={question.options ?? []}
                  reference={question.reference?.text}
                  value={getUserAnswer(question.id)}
                  correctAnswerOrder={question.key?.option?.order}
                  explanation={question.key?.explanation}
                />
              </Tabs.Panel>
            ))}
          </Tabs>
        </form>
      </AppShell.Main>
    </AppShell>
  );
}
