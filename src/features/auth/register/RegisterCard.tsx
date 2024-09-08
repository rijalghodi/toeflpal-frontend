'use client';

import { Anchor, Paper, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { routes } from '@/utils/constant/routes';
import Logo from '~/logo.png';

import classes from '../authStyles.module.css';
import { RegisterForm } from './RegisterForm';

export function RegisterCard() {
  return (
    <Paper classNames={{ root: classes['auth-card'] }}>
      <Stack align="stretch" w="100%" gap="lg">
        <Stack gap={8} align="center">
          <Image src={Logo} alt="logo" height={60} width={60} />
          <Title fz="xl" fw="600" ta="center">
            Register TOEFL Pal
          </Title>
        </Stack>
        {/* <GoogleLoginButton>Daftar dengan Google</GoogleLoginButton> */}
        <Stack gap={8}>
          {/* <Divider label="atau daftar dengan email" labelPosition="center" /> */}
          <RegisterForm />
        </Stack>
        <Text fz="sm" c="dark.3" ta="center">
          Have account?{' '}
          <Anchor fz="sm" href={routes.auth.login} component={Link}>
            Login here
          </Anchor>
        </Text>
      </Stack>
    </Paper>
  );
}
