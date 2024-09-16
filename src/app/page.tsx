'use client';

import { Icon } from '@iconify-icon/react';
import quoteL from '@iconify-icons/fa/quote-left';
import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Button,
  Container,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import hero from '~/hero.png';
import logo from '~/logo.png';

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
    title: '1000  +',
    desc: 'Growing users',
  },
];

const navs = [
  {
    title: 'Simulation',
    href: '/app/simulation',
  },
  {
    title: 'Practice',
    href: '/app/practice',
  },
  {
    title: 'Lessons',
    href: '/app/lessons',
  },
];

export default function Home() {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();

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
      header={{ height: { base: 70, xs: 80 }, offset: true }}
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
          <Group gap="xs">
            <Image src={logo} alt="Logo" height={50} width={50} />
            <Text fw={800} fz="h4" ff="heading" c="indigo.5">
              TOEFL PAL
            </Text>
          </Group>
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
        <Stack bg="#f5fbff" pb={80} py={0}>
          <Container py="xl" pos="relative" component="section">
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap="xl"
              wrap="wrap"
              align="center"
            >
              <Flex
                flex={1}
                direction="column"
                align={{ base: 'center', sm: 'flex-start' }}
                gap="lg"
                maw={540}
              >
                <Title
                  fz={{ base: 44, xs: 54 }}
                  fw={700}
                  ta={{ sm: 'left', base: 'center' }}
                >
                  Boost Your Next{' '}
                  <Text
                    span
                    c={colors.indigo[5]}
                    fz={{ base: 44, xs: 54 }}
                    fw={700}
                  >
                    TOEFL Score
                  </Text>
                </Title>
                <Text
                  fz={{ base: 'lg', sm: 'xl' }}
                  c="dark.3"
                  ta={{ sm: 'left', base: 'center' }}
                >
                  TOEFL Pal offers reliable TOEFL simulations and helps you
                  prepare systematically—all in one place!
                </Text>
                <Group>
                  <Button component={Link} href="/register" size="lg">
                    Try Now
                  </Button>
                </Group>
              </Flex>
              <Box
                pos="relative"
                w={{ base: '100%', xs: '70%', sm: 400 }}
                miw={300}
                style={{ aspectRatio: '1 / 1' }}
              >
                <Image src={hero} fill alt="hero" />
              </Box>
            </Flex>
          </Container>

          <Container component="section" w="100%" maw={1000}>
            <Paper radius="lg" px="lg" py="lg" shadow="xs" w="100%">
              <Group
                gap="xl"
                align="center"
                justify="space-between"
                wrap="wrap"
              >
                {features.map((feature, i) => (
                  <Stack align="center" gap="xs" key={i} flex={1} miw={200}>
                    <Title size="h2" mt="xs" ta="center" ff="text">
                      {feature.title}
                    </Title>
                    <Text c="dimmed" ta="center" fz="lg">
                      {feature.desc}
                    </Text>
                  </Stack>
                ))}
              </Group>
            </Paper>
          </Container>

          <Container component="section" w="100%" maw={1000} pt={80}>
            <Box maw={700} mx="auto" pos="relative">
              <Text
                fz="h2"
                fw={700}
                component="blockquote"
                c="dark.5"
                pos="relative"
                ml={12}
                mt={32}
              >
                <Icon
                  icon={quoteL}
                  height={32}
                  width={32}
                  style={{ position: 'absolute', left: -12, top: -40 }}
                />
                I got 600+ score TOEFL without taking any courses. Just by doing
                a ton of simulations on TOEFL Pal.
                <Text c="dimmed" mt="md">
                  - Dimaz Adhitya, Magister Student
                </Text>
              </Text>
            </Box>
          </Container>
        </Stack>
      </AppShell.Main>

      <Group align="center" justify="center" h={50} bg="#f5fbff">
        <Text ta="center" fz="sm">
          Made with ❤️ by Rijal Ghodi 2024
        </Text>
      </Group>

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
