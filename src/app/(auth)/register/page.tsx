import { Center } from '@mantine/core';
import { Metadata } from 'next';
import React from 'react';

import { RegisterCard } from '@/features/auth/register/RegisterCard';

export const metadata: Metadata = {
  title: 'Register | TOEFL Pal',
};
export default function LoginPage() {
  return (
    <Center w="100%" mih="100vh" py="md">
      <RegisterCard />
    </Center>
  );
}
