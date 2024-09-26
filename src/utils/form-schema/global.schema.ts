// import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { z } from 'zod';

export const zString = z
  .string({ invalid_type_error: 'Required' })
  .min(1, { message: 'Required' });
export const zStringOptional = z.string().optional();

export const zSelectInput = zString.nullable().refine((val) => val, {
  message: 'Required',
});

export const zArrayOfString = z.string().array();

export const zNumber = z.number({
  required_error: 'Required',
  invalid_type_error: 'Required',
});

export const zNumberOptional = z.number().or(z.literal(''));

export const zStringNumber = z
  .string()
  .min(1, { message: 'Required' })
  .refine((value) => /^[0-9.]+$/.test(value), {
    message: 'Must be a number',
  });

export const zStringNumberOptional = z
  .string()
  .refine((value) => /^[0-9.]+$/.test(value), {
    message: 'Must be a number',
  })
  .or(z.literal(''));
  
export const zPassword = z
  .string()
  .min(8, { message: 'Min 8 characters' })
  .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/, {
    message:
      'Must contain at least one uppercase letter, one lowercase letter, and one number',
  });

export const zTime = z
  .string()
  .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'Wrong format',
  })
  .or(z.literal(''));

export const zEmail = z
  .string()
  .min(1, { message: 'Required' })
  .email({ message: 'Wrong email format' });

export const zEmailOptional = z
  .string()
  .email({ message: 'Wrong email format' })
  .or(z.literal(''));

export const zDate = z.date({
  required_error: 'Required',
  invalid_type_error: 'Required / Format tanggal salah',
});

export const zDateOptional = z
  .date({
    required_error: 'Required',
    invalid_type_error: 'Required / Format tanggal salah',
  })
  .optional()
  .nullable();

export const zFileRequired = z
  .custom<File>()
  .refine((file) => file, { message: 'Required' });

export const zImageRequired = z
  .custom<File>()
  .refine((file) => file, { message: 'Required' })
  .refine(
    (file) =>
      file &&
      ['image/png', 'image/jpeg', 'image/png', 'image/webp'].includes(
        file.type,
      ),
    {
      message: 'File harus Foto',
    },
  );

export const zImageOptional = z
  .custom<File>()
  .refine(
    (file) =>
      file &&
      ['image/png', 'image/jpeg', 'image/png', 'image/webp'].includes(
        file.type,
      ),
    {
      message: 'File harus Foto',
    },
  )
  .or(z.literal(null));

export const zImageArrayOptional = z
  .custom<File>()
  .refine(
    (file) =>
      file &&
      ['image/png', 'image/jpeg', 'image/png', 'image/webp'].includes(
        file.type,
      ),
    {
      message: 'File harus Foto',
    },
  )
  .array();

export const zPdfArrayOptional = z
  .custom<File>()
  .refine((file) => file && ['application/pdf'].includes(file.type), {
    message: 'File harus pdf',
  })
  .array();

export const zAudioOptional = z
  .custom<File>()
  .refine((file) => file && file.type.startsWith('audio'), {
    message: 'Must be audio file',
  })
  .or(z.literal(null))
  .optional();

export const zBoolean = z.boolean();
