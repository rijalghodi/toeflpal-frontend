'use client';

import {
  ActionIcon,
  AppShell,
  Avatar,
  Container,
  Group,
  NavLink,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu3 } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo from '~/logo.png';

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 40, xs: 60 }, offset: true }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { desktop: opened, mobile: !opened },
      }}
      withBorder={false}
      padding="md"
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
            <Group gap="md">
              <Image src={logo} alt="Logo" height={40} width={40} />
              <Text fw={500} fz="h3" ff="heading">
                Toefl Pal
              </Text>
            </Group>
          </Group>

          <Group gap="md" visibleFrom="xs">
            <Avatar />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container maw={1000}>{children}</Container>
      </AppShell.Main>
      <AppShell.Navbar
        py="md"
        px="sm"
        styles={{
          navbar: {
            borderTopRightRadius: 16,
            // borderBottomRightRadius: 16,
            boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Stack gap={0}>
          <NavLink label="Dashboard" component={Link} href="/app/dashboard" />
          <NavLink label="Simulation" component={Link} href="/app/simulation" />
          <NavLink label="Admin" component={Link} href="/app/admin" />
          {/* <NavLink label="Practice"/> */}
        </Stack>
      </AppShell.Navbar>
    </AppShell>
  );
}
