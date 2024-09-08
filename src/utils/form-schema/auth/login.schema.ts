import { z } from 'zod';

import { LoginFormValues } from '@/types';

import { zEmail, zString } from '../global.schema';

export const loginSchema: z.ZodType<LoginFormValues> = z.object({
  email: zEmail,
  password: zString,
});
