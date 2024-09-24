'use client';

import {
  ActionIcon,
  AppShell,
  Box,
  Container,
  Flex,
  Group,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu3 } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { LogoAndText } from '@/elements/brand/LogoAndText';
import { Navbar } from '@/features/layout/Navbar';
import { UserAvatar } from '@/features/layout/UserAvatar';
import { routes } from '@/utils/constant/routes';

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const [opened, { toggle, close }] = useDisclosure();

  const [scrolled, setScrolled] = useState(false);

  // FIXME: It doesnt work
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppShell
      header={{ height: { base: 54, sm: 60 }, offset: true }}
      footer={{ height: { base: 70, sm: 0 }, offset: true }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { desktop: opened, mobile: !opened },
      }}
      withBorder={false}
      px={{ base: 'md', xs: 'lg', sm: 'xl' }}
    >
      <AppShell.Header
        bg="white"
        style={{
          boxShadow: scrolled
            ? 'rgba(17, 12, 46, 0.1) 0px 5px 40px 0px'
            : 'none',
        }}
      >
        <Group
          justify="space-between"
          h="100%"
          mx="auto"
          w="100%"
          pl="md"
          pr="md"
        >
          <Flex gap={{ base: 'md', sm: 'lg' }}>
            <ActionIcon
              size="lg"
              onClick={toggle}
              variant="subtle"
              color="dark"
              visibleFrom="sm"
            >
              <IconMenu3 />
            </ActionIcon>
            <Box visibleFrom="xs">
              <Link href={routes.home}>
                <LogoAndText size="sm" />
              </Link>
            </Box>
            <Box hiddenFrom="xs">
              <Link href={routes.home}>
                <LogoAndText size="xs" />
              </Link>
            </Box>
          </Flex>

          <Group gap="md">
            <UserAvatar />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container maw={992} px={0} pt="xs" pb="xl">
          {children}
        </Container>
      </AppShell.Main>
      <AppShell.Footer
        component="nav"
        hiddenFrom="sm"
        withBorder
        styles={{
          footer: {
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            boxShadow: '0 -10px 10px -10px rgba(51, 63, 85, 0.2)',
          },
        }}
      >
        <Navbar mobile />
      </AppShell.Footer>
      <AppShell.Navbar
        visibleFrom="sm"
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
