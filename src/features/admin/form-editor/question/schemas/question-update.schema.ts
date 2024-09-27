import { z } from 'zod';

import { zAudioOptional, zStringOptional } from '@/utils/form-schema';

export type QuestionUpdateFormValues = {
  text?: string;
  audio?: File | null;
  referenceId?: string;
  readingReferenceDetail?: string;
};

export const questionUpdateSchema: z.ZodType<QuestionUpdateFormValues> =
  z.object({
    text: zStringOptional,
    audio: zAudioOptional,
    referenceId: zStringOptional,
    readingReferenceDetail: zStringOptional,
  });
