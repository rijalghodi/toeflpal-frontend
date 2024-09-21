import { z } from 'zod';

import {
  zAudioOptional,
  zNumber,
  zString,
  zStringOptional,
} from '@/utils/form-schema';

export type FormUpdateFormValues = {
  name: string;
  duration: number;
  allowReview?: boolean;
  instruction?: string;
  instructionAudio?: File | null;
  closing?: string;
  closingAudio?: File | null;
};

export const formUpdateSchema: z.ZodType<FormUpdateFormValues> = z.object({
  name: zString,
  duration: zNumber,
  allowReview: z.boolean().optional(),
  instruction: zStringOptional,
  instructionAudio: zAudioOptional,
  closing: zStringOptional,
  closingAudio: zAudioOptional,
});
