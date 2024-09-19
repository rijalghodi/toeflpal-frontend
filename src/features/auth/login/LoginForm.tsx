'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconLock, IconMail } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { login, setAuthCookie } from '@/services';
import { LoginFormValues } from '@/types';
import { routes } from '@/utils/constant/routes';
import { loginSchema } from '@/utils/form-schema/auth/login.schema';

export function LoginForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    onSuccess(data) {
      const accessToken = data.data.accessToken;
      if (accessToken) {
        setAuthCookie({
          accessToken: accessToken.accessToken,
          refreshToken: '', // TODO:
          expires: accessToken.expiredAt,
        });
      }
      router.push(routes.dashboard);
    },
    onError: (error) => {
      notifications.show({
        title: 'Fail to login',
        message: (error as any)?.response?.data?.message,
        color: 'red',
      });
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
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
        />
        <PasswordInput
          leftSection={<IconLock size={16} />}
          placeholder="*****"
          label="Password"
          {...register('password')}
        />
        <Button type="submit" loading={isPending} size="md">
          Login
        </Button>
      </Stack>
    </form>
  );
}
