'use client';

import { Anchor, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { LogoAndText } from '@/elements/brand/LogoAndText';
import { routes } from '@/utils/constant/routes';

import { LoginForm } from './LoginForm';

export function LoginCard() {
  return (
    // <Paper classNames={{ root: classes['auth-card'] }}>
    <Stack align="stretch" w="100%" gap="lg" maw={400}>
      <Stack gap="xl" align="center">
        <LogoAndText size="xs" />
        <Title order={1} fz="h2" fw="600" ta="center" mb="md">
          Login to Your Account
        </Title>
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
        <Anchor fz="sm" href={routes.home} component={Link} ta="center">
          Back to home
        </Anchor>
      </Stack>
    </Stack>
    // </Paper>
  );
}
