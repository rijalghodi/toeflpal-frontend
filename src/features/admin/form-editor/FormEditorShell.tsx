'use client';

import {
  ActionIcon,
  AppShell,
  Button,
  Container,
  Group,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronLeft,
  IconMenu3,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import React from 'react';

import { FormEditorMain } from './FormEditorMain';

export function FormEditorShell() {
  const [opened, { toggle }] = useDisclosure();
  const { formId } = useParams();

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
          <Group gap="md">
            <ActionIcon
              color="gray"
              radius="xl"
              size="lg"
              variant="subtle"
              title="Back to Previous Page"
            >
              <IconChevronLeft size={16} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              onClick={toggle}
              variant="subtle"
              color="dark"
              title="Map"
            >
              <IconMenu3 />
            </ActionIcon>
            <Title order={1} fz="md" fw={600}>
              Form Editor
            </Title>
          </Group>
          <Group>
            <Button size="xs" leftSection={<IconPlayerPlay size={16} />}>
              Preview
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container maw={1000} px={0} pt="xs" pb="xl">
          <FormEditorMain formId={formId as string} />
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
        Navbar
      </AppShell.Navbar>
    </AppShell>
  );
}
