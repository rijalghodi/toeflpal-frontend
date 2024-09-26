'use client';

import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconArrowLeft,
  IconArrowRight,
  IconChecks,
  IconLogout2,
  IconPlayerPlay,
  IconSearch,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Logo, LogoAndText } from '@/elements';

import { Timer } from './Timer';

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
  onReview?: () => void;
  onQuit?: () => void;
  onStart?: () => Promise<any>;
  onSubmit?: () => Promise<any>;
  name?: string;
  step?: string;
  humanizedStep?: string;
  duration?: number;
  disabledNavigation?: boolean;
};

export function ReadingSimulationHeader({
  onNext,
  onPrev,
  onReview,
  onStart,
  onSubmit,
  name,
  step,
  humanizedStep,
  duration,
  disabledNavigation,
}: Props) {
  const router = useRouter();

  const handleQuit = () => {
    modals.openConfirmModal({
      title: 'Quit Confirmation',
      children: (
        <Text size="sm" color="dimmed">
          Are you sure you want to quit the test? You will lose all your current
          data for this section.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => router.back(),
    });
  };

  const handleActionClick = async (
    action?: () => Promise<any>,
    next?: () => void,
  ) => {
    try {
      await action?.();
      next?.();
    } catch (e) {
      notifications.show({ message: `Error ${String(e)}` });
    }
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

          {step === 'formstart' ? (
            <Button
              color="dark"
              variant="default"
              size="sm"
              title="Start Test"
              disabled={disabledNavigation}
              onClick={() => handleActionClick(onStart!, onNext)}
              leftSection={<IconPlayerPlay size={16} />}
            >
              Start
            </Button>
          ) : step === 'formend' ? (
            <>
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
                disabled={disabledNavigation}
              >
                <IconArrowLeft size={16} />
              </ActionIcon>
              <Button
                color="dark"
                variant="default"
                size="sm"
                title="Submit answers"
                disabled={disabledNavigation}
                onClick={() => handleActionClick(onSubmit!, onNext)}
                leftSection={<IconChecks size={16} />}
              >
                Submit
              </Button>
            </>
          ) : (
            <>
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
                disabled={disabledNavigation}
              >
                <IconArrowLeft size={16} />
              </ActionIcon>
              <ActionIcon
                color="dark"
                variant="default"
                size="lg"
                title="Next"
                onClick={onNext}
                disabled={disabledNavigation}
              >
                <IconArrowRight size={16} />
              </ActionIcon>
            </>
          )}
        </Group>
      </Group>
      <Paper px="md" py={4} radius={0} bg="gray.1">
        <Group justify="space-between" w="100%">
          <Group>
            <Text fz="xs" fw={600}>
              {name}
            </Text>
            <Divider orientation="vertical" />
            <Text fz="xs" fw={600}>
              {humanizedStep}
            </Text>
          </Group>
          {duration !== undefined && !step?.startsWith('form') && (
            <Timer duration={duration} />
          )}
        </Group>
      </Paper>
    </Stack>
  );
}
