import { Center } from '@mantine/core';
import { Metadata } from 'next';
import React from 'react';

import { LoginCard } from '@/features/auth/login/LoginCard';

export const metadata: Metadata = {
  title: 'Login | TOEFL Pal',
};
export default function LoginPage() {
  return (
    <Center w="100%" mih="100vh" py="md">
      <LoginCard />
    </Center>
  );
}
