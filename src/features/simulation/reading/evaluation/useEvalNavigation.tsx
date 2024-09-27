import { useMemo, useState } from 'react';

type Props = {
  partLength: number;
  questionLengthPerPart: number[];
};

export const useEvalNavigation = ({
  partLength,
  questionLengthPerPart: questionLengths,
}: Props) => {
  const [part, setPart] = useState(1); // Current part index
  const [question, setQuestion] = useState(1); // Current question
  /**
   * step will be:
   * formstart, formend
   * part-p1, part-p2, ...
   * question-p1q1, question-p2q2, ...
   */

  // Handle Next button
  const goNext = () => {
    if (question < questionLengths[part - 1]) {
      setQuestion((prev) => prev + 1);
    } else if (part < partLength) {
      setPart((prev) => prev + 1);
      setQuestion(1);
    }
  };

  // Handle Previous button
  const goPrev = () => {
    if (question > 1) {
      setQuestion((prev) => prev - 1);
    } else if (part > 1) {
      setPart((part) => part - 1);
      setQuestion(questionLengths[part - 2]);
    }
  };

  const extractStep = (step: string): { part: number; question: number } => {
    let part: number = 1;
    let question: number = 1;
    const match = step.match(/question-p(\d+)q(\d+)?/);

    if (match) {
      const [_, stepPart, stepQuestion] = match; // eslint-disable-line
      part = parseInt(stepPart, 10);
      question = parseInt(stepQuestion, 10);
    }
    return { part, question };
  };

  const humanizeStep = (step: string) => {
    const { part, question } = extractStep(step);
    const cumQuestion =
      questionLengths
        .slice(0, part - 1)
        .reduce((prev, curr) => prev + curr, 0) + question;

    const totalQuestionLength = questionLengths.reduce(
      (prev, curr) => prev + curr,
      0,
    );
    return `Question ${cumQuestion} of ${totalQuestionLength}`;
  };

  // Compute current step based on suffix, part, and question
  const currentStep = useMemo(() => {
    return `question-p${part}q${question}`;
  }, [part, question]);

  // Jump to specific step
  const jumpTo = (step: string) => {
    const { part, question } = extractStep(step);
    setPart(part);
    setQuestion(question);
  };

  return {
    goNext,
    goPrev,
    jumpTo,
    extractStep,
    humanizeStep,
    humanizedStep: humanizeStep(currentStep),
    currentStep,
    part,
    question,
  };
};
