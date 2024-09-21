'use client';

import { ActionIcon, AppShell, Avatar, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu3 } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { LogoAndText } from '@/elements/brand/LogoAndText';
import { Navbar } from '@/features/layout/Navbar';
import { routes } from '@/utils/constant/routes';

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 40, xs: 54 }, offset: true }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { desktop: opened, mobile: !opened },
      }}
      withBorder={false}
      px={{ base: 'md', xs: 'xl' }}
    >
      <AppShell.Header bg="rgba(0, 0, 0, 0)">
        <Group
          justify="space-between"
          h="100%"
          mx="auto"
          w="100%"
          pl="md"
          pr="md"
        >
          <Group gap="xl">
            <ActionIcon
              size="lg"
              onClick={toggle}
              variant="subtle"
              color="dark"
            >
              <IconMenu3 />
            </ActionIcon>
            <Link href={routes.home}>
              <LogoAndText size="xs" />
            </Link>
          </Group>

          <Group gap="md" visibleFrom="xs">
            <Avatar />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container maw={992} px={0} pt="xs" pb="xl">
          {children}
        </Container>
      </AppShell.Main>
      <AppShell.Navbar
        py="md"
        px="sm"
        styles={{
          navbar: {
            borderTopRightRadius: 16,
            boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Navbar />
      </AppShell.Navbar>
    </AppShell>
  );
}
