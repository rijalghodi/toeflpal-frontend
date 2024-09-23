'use client';

import {
  ActionIcon,
  AppShell,
  Button,
  Container,
  Group,
  Title,
} from '@mantine/core';
import { IconChevronLeft, IconPlayerPlay } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { FormEditorMain } from './FormEditorMain';

export function FormEditorShell() {
  const router = useRouter();
  const { formId } = useParams();
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

  const handlePreview = () => {
    window.open(`/form/${formId}/preview`, '_blank');
  };

  return (
    <AppShell
      header={{ height: { base: 40, xs: 54 }, offset: true }}
      withBorder={false}
      px={{ base: 'md', xs: 'xl' }}
    >
      <AppShell.Header
        bg="#fff"
        style={{
          boxShadow: scrolled
            ? 'rgba(17, 12, 46, 0.05) 0px 5px 20px 0px'
            : undefined,
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
          <Group gap="md">
            <ActionIcon
              color="dark"
              radius="xl"
              size="lg"
              variant="subtle"
              title="Back to Previous Page"
              onClick={router.back}
            >
              <IconChevronLeft size={16} />
            </ActionIcon>
            <Title order={1} fz="md" fw={600}>
              Form Editor
            </Title>
          </Group>
          <Group>
            <Button
              size="xs"
              leftSection={<IconPlayerPlay size={16} />}
              onClick={handlePreview}
            >
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
    </AppShell>
  );
}
