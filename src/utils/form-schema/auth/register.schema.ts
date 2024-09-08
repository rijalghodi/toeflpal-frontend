import { z } from 'zod';

import { RegisterFormValues } from '@/types';

import { zEmail, zPassword } from '../global.schema';

export const registerSchema: z.ZodType<RegisterFormValues> = z.object({
  email: zEmail,
  password: zPassword,
});
