import { useMemo, useState } from 'react';

type Props = {
  partLength: number;
  questionLengthPerPart: number[];
};

export const useSimulNavigation = ({
  partLength,
  questionLengthPerPart: questionLengths,
}: Props) => {
  const [suffix, setSuffix] = useState('formstart'); // formstart, formend, part, question
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
    if (suffix === 'formstart') {
      setSuffix('part');
      setPart(1);
    } else if (suffix === 'part') {
      setSuffix('question');
      setQuestion(1);
    } else if (suffix === 'question') {
      if (question < questionLengths[part - 1]) {
        setQuestion((prev) => prev + 1);
      } else if (part < partLength) {
        setSuffix('part');
        setPart((prev) => prev + 1);
      } else {
        setSuffix('formend');
      }
    }
  };

  // Handle Previous button
  const goPrev = () => {
    if (suffix === 'formend') {
      setSuffix('question');
      setQuestion(questionLengths[part - 1]);
    } else if (suffix === 'question') {
      if (question > 1) {
        setQuestion((prev) => prev - 1);
      } else {
        setSuffix('part');
      }
    } else if (suffix === 'part') {
      if (part > 1) {
        setSuffix('question');
        setPart((prev) => prev - 1);
        setQuestion(questionLengths[part - 2]);
      } else {
        setSuffix('formstart');
      }
    }
  };

  const extractStep = (
    step: string,
  ): { suffix: string; part: number; question: number } => {
    let suffix: string = '';
    let part: number = 1;
    let question: number = 1;
    if (step === 'formstart') {
      suffix = step;
      part = 1;
      question = 1;
    }
    if (step === 'formend') {
      suffix = step;
      part = partLength;
      question = questionLengths[part - 1];
    }

    const match = step.match(
      /(formstart|formend|part|question)-p(\d+)(q(\d+))?/,
    );

    if (match) {
      const [, stepSuffix, stepPart, , stepQuestion] = match;
      suffix = stepSuffix;
      part = parseInt(stepPart, 10);
      if (stepQuestion) {
        question = parseInt(stepQuestion, 10);
      } else if (stepSuffix === 'question') {
        question = 1;
      }
    }
    return { suffix, part, question };
  };

  const humanizeStep = (step: string) => {
    const { suffix, part, question } = extractStep(step);
    if (suffix === 'formstart') {
      return `Direction`;
    }
    if (suffix === 'formend') {
      return `Closing`;
    }
    if (suffix === 'part') {
      return `Part ${part} Direction`;
    }
    if (suffix === 'question') {
      const cumQuestion =
        questionLengths
          .slice(0, part - 1)
          .reduce((prev, curr) => prev + curr, 0) + question;

      const totalQuestionLength = questionLengths.reduce(
        (prev, curr) => prev + curr,
        0,
      );
      return `Question ${cumQuestion} of ${totalQuestionLength}`;
    }
  };

  // Compute current step based on suffix, part, and question
  const currentStep = useMemo(() => {
    if (suffix === 'formstart' || suffix === 'formend') return suffix;
    if (suffix === 'part') return `part-p${part}`;
    return `question-p${part}q${question}`;
  }, [suffix, part, question]);

  // Jump to specific step
  const jumpTo = (step: string) => {
    const { suffix, part, question } = extractStep(step);
    setSuffix(suffix);
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
    suffix,
    part,
    question,
  };
};
