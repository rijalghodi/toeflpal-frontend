'use client';

import { Anchor, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { LogoAndText } from '@/elements/brand/LogoAndText';
import { routes } from '@/utils/constant/routes';

import { RegisterForm } from './RegisterForm';

export function RegisterCard() {
  return (
    <Stack align="stretch" w="100%" gap="lg" maw={400}>
      <Stack gap={8} align="center">
        <Stack gap="xl" align="center">
          <LogoAndText size="xs" />
          <Title order={1} fz="h2" fw="600" ta="center" mb="md">
            Register New Account
          </Title>
        </Stack>
      </Stack>
      {/* <GoogleLoginButton>Daftar dengan Google</GoogleLoginButton> */}
      <Stack gap={8}>
        {/* <Divider label="atau daftar dengan email" labelPosition="center" /> */}
        <RegisterForm />
      </Stack>
      <Stack gap={8}>
        <Text fz="sm" c="dark.3" ta="center">
          Have account?{' '}
          <Anchor fz="sm" href={routes.auth.login} component={Link}>
            Login here
          </Anchor>
        </Text>
        <Anchor fz="sm" href={routes.home} component={Link} ta="center">
          Back to home
        </Anchor>
      </Stack>
    </Stack>
  );
}
