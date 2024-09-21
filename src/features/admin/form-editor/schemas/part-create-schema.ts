import { z } from 'zod';

import { zAudioOptional, zString, zStringOptional } from '@/utils/form-schema';

export type PartCreateFormValues = {
  name: string;
  instruction?: string;
  instructionAudio?: File | null;
  closing?: string;
  closingAudio?: File | null;
};

export const partCreateSchema: z.ZodType<PartCreateFormValues> = z.object({
  name: zString,
  instruction: zStringOptional,
  instructionAudio: zAudioOptional,
  closing: zStringOptional,
  closingAudio: zAudioOptional,
});
