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
import {
  IconArrowLeft,
  IconArrowRight,
  IconLogout2,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Logo, LogoAndText } from '@/elements';

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  onReview?: () => void;
  onQuit?: () => void;
  name?: string;
  step?: string;
  humanizedStep?: string;
};

export function ReadingEvaluationHeader({
  onNext,
  onPrev,
  name,
  humanizedStep,
}: Props) {
  const router = useRouter();

  const handleQuit = () => {
    router.back();
  };

  return (
    <Stack gap={0} w="100%">
      <Group justify="space-between" w="100%" px="md" py={8}>
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
      <Paper px="md" py={4} radius={0} bg="gray.1">
        <Group justify="space-between" w="100%">
          <Group>
            <Text fz={{ base: 'xs', xs: 'sm' }} fw={600} visibleFrom="xs">
              {name}
            </Text>
            <Divider orientation="vertical" visibleFrom="xs" />
            <Text fz={{ base: 'xs', xs: 'sm' }} fw={600}>
              {humanizedStep}
            </Text>
          </Group>
        </Group>
      </Paper>
    </Stack>
  );
}
