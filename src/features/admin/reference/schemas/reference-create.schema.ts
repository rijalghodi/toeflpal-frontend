import { z } from 'zod';

import { zAudioOptional, zString, zStringOptional } from '@/utils/form-schema';

export type ReferenceCreateFormValues = {
  name: string;
  text?: string;
  audio?: File | null;
};

export const referenceCreateSchema: z.ZodType<ReferenceCreateFormValues> =
  z.object({
    name: zString,
    text: zStringOptional,
    audio: zAudioOptional,
  });
