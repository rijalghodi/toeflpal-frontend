'use client';

import {
  Anchor,
  AppShell,
  Burger,
  Button,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LogoAndText } from '@/elements/brand/LogoAndText';
import { routes } from '@/utils/constant/routes';

const features = [
  {
    title: '20+',
    desc: 'TOEFL Test',
  },
  {
    title: '99+',
    desc: 'TOEFL lessons',
  },
  {
    title: '1000+',
    desc: 'Growing users',
  },
  {
    title: '100%',
    desc: 'Free access',
  },
];

const navs = [
  {
    title: 'Simulation',
    href: routes.toeflList,
  },
  {
    title: 'Practice',
    href: routes.practiceList,
  },
  {
    title: 'Lessons',
    href: routes.lessonList,
  },
];

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle, close }] = useDisclosure();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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
      header={{ height: { base: 60, xs: 70 }, offset: true }}
      aside={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      withBorder={false}
      padding="md"
    >
      <AppShell.Header
        bg="#F5FBFF"
        style={{
          boxShadow: scrolled
            ? 'rgba(17, 12, 46, 0.05) 0px 5px 20px 0px'
            : undefined,
        }}
      >
        <Group
          justify="space-between"
          h="100%"
          maw={1000}
          mx="auto"
          w="100%"
          pl="md"
          pr="md"
        >
          <Link href={routes.home}>
            <LogoAndText size="sm" />
          </Link>
          <Group align="center" gap="xl" component="nav" visibleFrom="sm">
            {navs.map((item, i) => (
              <Anchor
                underline="hover"
                component={Link}
                href={item.href}
                c="dark"
                key={i}
              >
                {item.title}
              </Anchor>
            ))}
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap="md" visibleFrom="sm">
            <Button variant="light" size="sm" component={Link} href="/login">
              Login
            </Button>
            <Button size="sm" component={Link} href="/register">
              Register
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main bg="#f5fbff">
        {children}
        <Stack align="center" mx="auto">
          <Group align="center">
            <Anchor
              underline="hover"
              href={process.env.NEXT_PUBLI_GITHUB}
              fz="sm"
            >
              About
            </Anchor>
            <Anchor href={process.env.NEXT_PUBLIC_PORTFOLIO} fz="sm">
              Author
            </Anchor>
            <Anchor href={process.env.NEXT_PUBLI_CONTACT} fz="sm">
              Contact
            </Anchor>
          </Group>
          <Text ta="center" fz="sm">
            &copy; 2024 TOEFL Pal. All rights reserved.
          </Text>
        </Stack>
      </AppShell.Main>

      <AppShell.Aside py="md" px={4} bg="#f5fbff">
        <Stack maw={200} mx="auto" pt="xl" pb="xl" gap="xl">
          {navs.map((item, i) => (
            <Anchor
              underline="hover"
              component={Link}
              href={item.href}
              c="dark"
              ta="center"
              fz="xl"
              key={i}
              onClick={close}
            >
              {item.title}
            </Anchor>
          ))}
          <Stack>
            <Button variant="light" size="md" component={Link} href="/login">
              Login
            </Button>
            <Button size="md" component={Link} href="/register">
              Register
            </Button>
          </Stack>
        </Stack>
      </AppShell.Aside>
    </AppShell>
  );
}
