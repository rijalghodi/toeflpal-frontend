// import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { z } from 'zod';

export const zString = z
  .string({ invalid_type_error: 'Harus di isi' })
  .min(1, { message: 'Harus diisi' });
export const zStringOptional = z.string().optional();

export const zSelectInput = zString.nullable().refine((val) => val, {
  message: 'Harus diisi',
});

export const zArrayOfString = z.string().array();

export const zNumber = z.number({
  required_error: 'Harus diisi',
  invalid_type_error: 'Harus diisi',
});

export const zNumberOptional = z.number().or(z.literal(''));

export const zStringNumber = z
  .string()
  .min(1, { message: 'Harus diisi' })
  .refine((value) => /^[0-9.]+$/.test(value), {
    message: 'Input hanya boleh berisi angka',
  });

export const zStringNumberOptional = z
  .string()
  .refine((value) => /^[0-9.]+$/.test(value), {
    message: 'Input hanya boleh berisi angka',
  })
  .or(z.literal(''));

export const zPassword = z
  .string()
  .min(8, { message: 'Kata sandi minimal 8 karakter' })
  .regex(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]*$/, {
    message: 'Harus terdiri dari kombinasi huruf besar, huruf kecil, dan angka',
  });

export const zTime = z
  .string()
  .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'Format salah',
  })
  .or(z.literal(''));

export const zEmail = z
  .string()
  .min(1, { message: 'Harus diisi' })
  .email({ message: 'Format email salah' });

export const zEmailOptional = z
  .string()
  .email({ message: 'Format email salah' })
  .or(z.literal(''));

export const zDate = z.date({
  required_error: 'Harus diisi',
  invalid_type_error: 'Harus diisi / Format tanggal salah',
});

export const zDateOptional = z
  .date({
    required_error: 'Harus diisi',
    invalid_type_error: 'Harus diisi / Format tanggal salah',
  })
  .optional()
  .nullable();

export const zFileRequired = z
  .custom<File>()
  .refine((file) => file, { message: 'Harus diisi' });

export const zImageRequired = z
  .custom<File>()
  .refine((file) => file, { message: 'Harus diisi' })
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
  .or(z.literal(null))
  .optional();

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

// export const zImageOrPDFArrayOptional = z
//   .custom<File>()
//   .refine(
//     (file) =>
//       file && [...PDF_MIME_TYPE, ...IMAGE_MIME_TYPE].includes(file.type as any),
//     {
//       message: "Format file tidak sesuai",
//     }
//   )
//   .array();

export const zBoolean = z.boolean();
