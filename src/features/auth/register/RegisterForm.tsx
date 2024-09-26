'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconLock, IconMail } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { register as registerUser } from '@/services';
import { RegisterFormValues } from '@/types';
import { registerSchema } from '@/utils/form-schema/auth';

export function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
    mutationKey: ['register'],
    onSuccess() {
      router.push('/login');
    },
    onError: (error) => {
      notifications.show({
        title: 'Fail to create account',
        message: (error as any)?.response?.data?.message,
        color: 'red',
      });
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="sm" w="100%">
        <TextInput
          type="email"
          placeholder="email@example.com"
          label="Email"
          leftSection={<IconMail size={16} />}
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput
          placeholder="*****"
          label="Password"
          leftSection={<IconLock size={16} />}
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" loading={isPending} size="md">
          Register
        </Button>
      </Stack>
    </form>
  );
}
