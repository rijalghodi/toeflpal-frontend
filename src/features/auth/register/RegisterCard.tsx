'use client';

import { Anchor, Group, Paper, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { routes } from '@/utils/constant/routes';
import logo from '~/logo.png';

import classes from '../authStyles.module.css';
import { RegisterForm } from './RegisterForm';

export function RegisterCard() {
  return (
    <Stack align="stretch" w="100%" gap="lg" maw={400}>
      <Stack gap={8} align="center">
        <Group gap="xs" mb="md">
          <Image src={logo} alt="Logo" height={40} width={40} />
          <Text fw={800} fz="h4" ff="heading" c="indigo">
            TOEFL PAL
          </Text>
        </Group>
        <Title order={1} fz="h2" fw="600" ta="center">
          Welcome to Toefl Pal
        </Title>
        <Text c="dimmed" ta="center">
          Create new account
        </Text>
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
        <Anchor fz="sm" href="/" component={Link} ta="center">
          Back to home
        </Anchor>
      </Stack>
    </Stack>
  );
}
