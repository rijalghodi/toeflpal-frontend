'use client';

import {
  AppShell,
  Box,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  IconPencil,
  IconReportAnalytics,
  IconTestPipe2,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import hero from '~/hero.png';
import logo from '~/logo.png';

export default function Home() {
  const { colors } = useMantineTheme();
  const features = [
    {
      title: 'TOEFL Test',
      desc: 'Take a real TOEFL Test online',
      icon: <IconTestPipe2 size={32} color={colors.indigo[5]} />,
    },
    {
      title: 'TOEFL Evaluation',
      desc: 'Get evaluation from your mistake',
      icon: <IconReportAnalytics size={32} color={colors.indigo[5]} />,
    },
    {
      title: 'TOEFL Learning',
      desc: 'Learn and explore TOEFL materials',
      icon: <IconPencil size={32} color={colors.indigo[5]} />,
    },
  ];
  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      withBorder={false}
      padding="md"
    >
      <AppShell.Header bg="aliceblue">
        <Group
          justify="space-between"
          h="100%"
          px="md"
          maw={1000}
          mx="auto"
          w="100%"
        >
          <Group gap="md">
            <Image src={logo} alt="Logo" height={50} width={50} />
            <Text fw={600} fz="lg">
              Toefl Pal
            </Text>
          </Group>
          <Group gap="md">
            <Button variant="outline" size="sm" component={Link} href="/login">
              Login
            </Button>
            <Button size="sm" component={Link} href="/register">
              Try Now
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main bg="aliceblue">
        <Box w="100vw" component="section" bg="aliceblue">
          <Container py={0} pos="relative">
            <Group gap="lg" align="center">
              <Box py="xl" flex={1}>
                <Title fz={44} mb="xl">
                  The Real{' '}
                  <Text span c={colors.indigo[4]} fz={44} fw={700}>
                    TOEFL Test
                  </Text>{' '}
                  Simulation
                </Title>
                <Text fz="lg" mb="xl" c="dark.4">
                  Prepare for your next TOEFL test in one place. Learn,
                  practice, and evaluate your TOEFL skills all in one platform.
                </Text>
                <Group>
                  <Button component={Link} href="/register" size="xl">
                    Try Now
                  </Button>
                </Group>
              </Box>
              <Box>
                <Image src={hero} height={400} width={400} alt="hero" />
              </Box>
            </Group>
          </Container>
          <Box py={24}>
            <Container component="section" w="100%" maw={1200}>
              <Stack>
                {/* <Title fz="h1" ta="center">
                Features
              </Title> */}
                <Group gap="xl" align="center" justify="center">
                  {features.map((v) => (
                    <Paper radius="lg" p="lg" shadow="md" w={320}>
                      <Box>{v.icon}</Box>
                      <Title size="h4" mb="xs" mt="md">
                        {v.title}
                      </Title>
                      <Text c="dimmed">{v.desc}</Text>
                    </Paper>
                  ))}
                </Group>
              </Stack>
            </Container>
          </Box>
        </Box>
      </AppShell.Main>
      <footer style={{ backgroundColor: 'aliceblue' }}>
        <Container py="sm">
          <Text ta="center" fz="sm" c="dimmed">
            Made with ❤️ by Rijal Ghodi 2024
          </Text>
        </Container>
      </footer>
    </AppShell>
  );
}
