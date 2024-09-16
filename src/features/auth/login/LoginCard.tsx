'use client';

import { Anchor, Group, Paper, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { routes } from '@/utils/constant/routes';
import logo from '~/logo.png';

import classes from '../authStyles.module.css';
import { LoginForm } from './LoginForm';

export function LoginCard() {
  return (
    // <Paper classNames={{ root: classes['auth-card'] }}>
    <Stack align="stretch" w="100%" gap="lg" maw={400}>
      <Stack gap={8} align="center">
        <Group gap="xs" mb="md">
          <Image src={logo} alt="Logo" height={40} width={40} />
          <Text fw={800} fz="h4" ff="heading" c="indigo">
            TOEFL PAL
          </Text>
        </Group>
        <Title order={1} fz="h2" fw="600" ta="center">
          Welcome back!
        </Title>
        <Text c="dimmed" ta="center">
          Login to your account
        </Text>
      </Stack>
      {/* <GoogleLoginButton /> */}
      <Stack gap={8}>
        <LoginForm />
      </Stack>
      <Stack align="center" gap={8}>
        {/* <Text fz="sm" c="dark.3" ta="center">
            Forgot Password?{' '}
            <Anchor fz="sm" href={routes.auth.forgotPassword} component={Link}>
              Reset Password
            </Anchor>
          </Text> */}
        <Text fz="sm" c="dark.3" ta="center">
          No account?{' '}
          <Anchor fz="sm" href={routes.auth.register} component={Link}>
            Register here
          </Anchor>
        </Text>
        <Anchor fz="sm" href="/" component={Link} ta="center">
          Back to home
        </Anchor>
      </Stack>
    </Stack>
    // </Paper>
  );
}
