'use client';

import { Anchor, Paper, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { routes } from '@/utils/constant/routes';
import Logo from '~/logo.png';

import classes from '../authStyles.module.css';
import { LoginForm } from './LoginForm';

export function LoginCard() {
  return (
    <Paper classNames={{ root: classes['auth-card'] }}>
      <Stack align="stretch" w="100%" gap="lg">
        <Stack gap={8} align="center">
          <Image src={Logo} alt="logo" height={60} width={60} />
          <Title fz="xl" fw="600" ta="center">
            Welcome back
          </Title>
          <Text fz="md" c="dark.3">
            Login to TOEFL Pal
          </Text>
        </Stack>
        {/* <GoogleLoginButton /> */}
        <Stack gap={8}>
          {/* <Divider label="atau masuk dengan email" labelPosition="center" /> */}
          <LoginForm />
        </Stack>
        <Stack align="center" gap={4}>
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
        </Stack>
      </Stack>
    </Paper>
  );
}
