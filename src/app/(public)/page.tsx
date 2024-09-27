'use client';

import { Icon } from '@iconify-icon/react';
import quoteL from '@iconify-icons/fa/quote-left';
import {
  Box,
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
import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/utils/constant/routes';
import hero from '~/hero.png';

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

export default function Home() {
  const { colors } = useMantineTheme();

  return (
    <>
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
                <Button component={Link} href={routes.toeflList} size="lg">
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
            <Group gap="xl" align="center" justify="space-between" wrap="wrap">
              {features.map((feature, i) => (
                <Stack align="center" gap={4} key={i} flex={1} miw={200}>
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
              fw={600}
              component="blockquote"
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
              I got 600+ score TOEFL without taking any courses. Just by doing a
              ton of simulations on TOEFL Pal.
              <Text c="dimmed" mt="md">
                - Dimaz Adhitya, Magister Student
              </Text>
            </Text>
          </Box>
        </Container>
      </Stack>
    </>
  );
}
