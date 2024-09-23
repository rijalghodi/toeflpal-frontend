'use client';

import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconArrowLeft,
  IconArrowRight,
  IconLogout2,
  IconSearch,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Logo, LogoAndText } from '@/elements';

// import { FormEditorMain } from './FormEditorMain';

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  onReview?: () => void;
  onQuit?: () => void;
  name?: string;
  step?: string | number;
};

export function TextSimulationHeader({
  onNext,
  onPrev,
  onReview,
  name,
  step,
}: Props) {
  const router = useRouter();

  const handleQuit = () => {
    modals.openConfirmModal({
      title: 'Quit Confirmation',
      children: (
        <Text size="sm" c="dimmed">
          Are you sure you want to quit the test? You will lose all your current
          data for this section.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        router.back();
      },
    });
  };

  return (
    <Stack gap={0} w="100%">
      <Group justify="space-between" w="100%" pl="md" pr="md" py={8}>
        <Group gap="md">
          <Box hiddenFrom="xs">
            <Logo size="xs" />
          </Box>
          <Box visibleFrom="xs">
            <LogoAndText size="sm" />
          </Box>
        </Group>
        <Group gap="xs">
          <ActionIcon
            color="dark"
            variant="default"
            size="lg"
            title="Quit"
            onClick={handleQuit}
          >
            <IconLogout2 size={16} />
          </ActionIcon>
          <ActionIcon
            color="dark"
            variant="default"
            size="lg"
            title="Review"
            onClick={onReview}
          >
            <IconSearch size={16} />
          </ActionIcon>

          <ActionIcon
            color="dark"
            variant="default"
            size="lg"
            title="Previous"
            onClick={onPrev}
          >
            <IconArrowLeft size={16} />
          </ActionIcon>
          <ActionIcon
            color="dark"
            variant="default"
            size="lg"
            title="Next"
            onClick={onNext}
          >
            <IconArrowRight size={16} />
          </ActionIcon>
        </Group>
      </Group>
      <Paper px="md" py={4} radius={0} bg="gray.1   ">
        <Group justify="space-between" w="100%">
          <Group>
            <Text fz="xs" fw={600}>
              {name}
            </Text>
            <Divider orientation="vertical" />
            <Text fz="xs" fw={600}>
              {step}
            </Text>
          </Group>
          <Text fz="xs" fw={600}>
            30:00
          </Text>
        </Group>
      </Paper>
    </Stack>
  );
}
