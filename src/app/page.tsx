'use client';

import {
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
import {
  IconEditCircle,
  IconHeadphones,
  IconReportAnalytics,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import hero from '~/hero.png';
import logo from '~/logo.png';

export default function Home() {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const features = [
    {
      title: 'TOEFL Simulation',
      desc: 'Take reliable TOEFL Test simulation',
      icon: <IconHeadphones size={32} color={colors.indigo[5]} />,
    },
    {
      title: 'TOEFL Evaluation',
      desc: 'Get evaluation from your mistake',
      icon: <IconReportAnalytics size={32} color={colors.indigo[5]} />,
    },
    {
      title: 'TOEFL Learning',
      desc: 'Learn and explore TOEFL materials',
      icon: <IconEditCircle size={32} color={colors.indigo[5]} />,
    },
  ];
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
      <AppShell.Header bg="aliceblue">
        <Group
          justify="space-between"
          h="100%"
          maw={1000}
          mx="auto"
          w="100%"
          pl="md"
          pr="md"
        >
          <Group gap="md">
            <Image src={logo} alt="Logo" height={50} width={50} />
            <Text fw={500} fz="h2" ff="heading">
              Toefl Pal
            </Text>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Group gap="md" visibleFrom="xs">
            <Button variant="outline" size="md" component={Link} href="/login">
              Login
            </Button>
            <Button size="md" component={Link} href="/register">
              Register
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main bg="aliceblue">
        <Stack bg="aliceblue" pb={120} py={0}>
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
                  ff="heading"
                  fw={500}
                  ta={{ sm: 'left', base: 'center' }}
                >
                  Supercharge Your Next{' '}
                  <Text
                    span
                    c={colors.indigo[4]}
                    fz={{ base: 44, xs: 54 }}
                    fw={500}
                  >
                    TOEFL Test
                  </Text>
                </Title>
                <Text
                  fz={{ base: 'lg', sm: 'xl' }}
                  c="dark.3"
                  ta={{ sm: 'left', base: 'center' }}
                >
                  Realiable TOEFL test simulator to maximize your next score.
                  Practice and learn all in one place
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
                <Image src={hero} fill alt="hero" style={{}} />
              </Box>
            </Flex>
          </Container>
          <Container component="section" w="100%" maw={1200}>
            <Stack>
              {/* <Title fz="h1" ta="center">
                Features
              </Title> */}
              <Group gap="xl" align="center" justify="center">
                {features.map((v, i) => (
                  <Paper key={i} radius="lg" p="lg" shadow="md" w={320}>
                    <Stack align="center" gap="xs">
                      <Box>{v.icon}</Box>
                      <Title size="h4" mt="xs" ta="center" ff="text">
                        {v.title}
                      </Title>
                      <Text c="dimmed" ta="center">
                        {v.desc}
                      </Text>
                    </Stack>
                  </Paper>
                ))}
              </Group>
            </Stack>
          </Container>
        </Stack>
      </AppShell.Main>
      <AppShell.Aside py="md" px={4} bg="aliceblue">
        <Stack maw={200} mx="auto" pt="xl" pb="xl">
          <Button variant="outline" size="md" component={Link} href="/login">
            Login
          </Button>
          <Button size="md" component={Link} href="/register">
            Register
          </Button>
        </Stack>
      </AppShell.Aside>

      <Group align="center" justify="center" h={50} bg="aliceblue">
        <Text ta="center" fz="sm" c="dimmed">
          Made with ❤️ by Rijal Ghodi 2024
        </Text>
      </Group>
    </AppShell>
  );
}
