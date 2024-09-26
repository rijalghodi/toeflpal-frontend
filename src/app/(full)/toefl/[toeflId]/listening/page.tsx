'use client';

import { Container, Group, Title } from '@mantine/core';
import { useParams } from 'next/navigation';
import React from 'react';

import { BackButton } from '@/elements';
import { ComingSoon } from '@/elements/feedbacks/ComingSoon';
import { routes } from '@/utils/constant/routes';

export default function ToeflListeningPage() {
  const { toeflId } = useParams();

  return (
    <Container maw={1000} py="xl">
      <Group mb="xl">
        <BackButton href={routes.toeflDetail(toeflId as string)} />
      </Group>
      <Title fw={600} order={1} fz="h2">
        Listeing Section
      </Title>
      <ComingSoon />
    </Container>
  );
}
