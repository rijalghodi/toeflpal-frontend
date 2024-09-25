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

// import { FormEditorMain } from './FormEditorMain';

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

export function ReadingSimulationHeader(props: Props) {
  const router = useRouter();
  console.log(props.step);

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
          {props.step === 'formstart' ? (
            <Button
              color="dark"
              variant="default"
              size="sm"
              title="Start Test"
              disabled={props.disabledNavigation}
              onClick={async () => {
                try {
                  await props.onStart?.();
                  props.onNext?.();
                } catch (e) {
                  notifications.show({ message: `Error ${String(e)}` });
                }
              }}
              leftSection={<IconPlayerPlay size={16} />}
            >
              Start
            </Button>
          ) : props.step === 'formend' ? (
            <Button
              color="dark"
              variant="default"
              size="sm"
              title="Submit answers"
              disabled={props.disabledNavigation}
              onClick={async () => {
                try {
                  await props.onSubmit?.();
                  props.onNext?.();
                } catch (e) {
                  notifications.show({ message: `Error ${String(e)}` });
                }
              }}
              leftSection={<IconChecks size={16} />}
            >
              Submit
            </Button>
          ) : (
            <>
              <ActionIcon
                color="dark"
                variant="default"
                size="lg"
                title="Review"
                onClick={props.onReview}
              >
                <IconSearch size={16} />
              </ActionIcon>

              <ActionIcon
                color="dark"
                variant="default"
                size="lg"
                title="Previous"
                onClick={props.onPrev}
                disabled={props.step === 'part-p1' || props.disabledNavigation}
                hidden
              >
                <IconArrowLeft size={16} />
              </ActionIcon>
              <ActionIcon
                color="dark"
                variant="default"
                size="lg"
                title="Next"
                onClick={props.onNext}
                disabled={props.disabledNavigation}
              >
                <IconArrowRight size={16} />
              </ActionIcon>
            </>
          )}
        </Group>
      </Group>
      <Paper px="md" py={4} radius={0} bg="gray.1   ">
        <Group justify="space-between" w="100%">
          <Group>
            <Text fz="xs" fw={600}>
              {props.name}
            </Text>
            <Divider orientation="vertical" />
            <Text fz="xs" fw={600}>
              {props.humanizedStep}
            </Text>
          </Group>
          {props.duration !== undefined && !props.step?.startsWith('form') && (
            <Timer duration={props.duration ?? 0} />
          )}
        </Group>
      </Paper>
    </Stack>
  );
}
