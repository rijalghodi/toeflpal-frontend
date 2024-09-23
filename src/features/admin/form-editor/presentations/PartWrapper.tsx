import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Flex,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconEdit,
  IconPlus,
  IconRowInsertTop,
  IconTrash,
} from '@tabler/icons-react';
import React from 'react';

import { AudioPlayer, LabelValuePairs, ReadTriggerButton } from '@/elements';

type Props = {
  children: React.ReactNode;
  name?: string;
  order?: number;
  onAddQuestion?: () => void;
  onDeletePart?: () => void;
  onEditPart?: () => void;
  onAddPartBelow?: () => void;
  instructionText?: string;
  instructionAudioUrl?: string;
};

export function PartWrapper({
  children,
  name,
  order,
  onAddPartBelow,
  onAddQuestion,
  onEditPart,
  onDeletePart,
  instructionText,
  instructionAudioUrl,
}: Props) {
  const [questionOpened, { toggle: toggleQuestions }] = useDisclosure(true);

  const renderReadAndAudio = (
    read: { title: string; content?: string },
    audio: { src?: string },
  ) =>
    read.content || audio.src ? (
      <Group gap="sm">
        {read.content && (
          <ReadTriggerButton content={read.content} title={read.title} />
        )}
        {audio.src && (
          <AudioPlayer src={audio.src} miw={100} maw={300} flex={1} />
        )}
      </Group>
    ) : (
      'None'
    );

  return (
    <Box pos="relative" pt="xl">
      <Paper
        bg="indigo"
        c="white"
        pos="absolute"
        top={0}
        left={0}
        pt="xs"
        pb="xl"
        px="sm"
        style={{ zIndex: 1 }}
      >
        <Text fz="xs" tt="uppercase" c="#fff" fw={700}>
          Part {order}
        </Text>
      </Paper>
      <Paper withBorder p="sm" pos="relative" style={{ zIndex: 2 }}>
        <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between">
          <Title order={2} fz="xs" fw={700} tt="uppercase" c="primary">
            {name}
          </Title>

          <Group justify="flex-end" gap={8}>
            <ActionIcon
              variant="subtle"
              color="dark"
              radius="xl"
              size="lg"
              title="Expand/Collapse"
              onClick={toggleQuestions}
            >
              {questionOpened ? (
                <IconChevronUp size={20} />
              ) : (
                <IconChevronDown size={20} />
              )}
            </ActionIcon>

            <Button
              leftSection={<IconPlus size={16} />}
              size="xs"
              variant="light"
              color="dark"
              onClick={onAddQuestion}
            >
              Question
            </Button>
            <Menu shadow="xs" withArrow position="bottom-end">
              <Menu.Target>
                <ActionIcon color="dark" variant="subtle" radius="xl" size="lg">
                  <IconDotsVertical size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconEdit size={14} />}
                  fz="sm"
                  py={6}
                  onClick={onEditPart}
                >
                  Edit Part
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconRowInsertTop size={14} />}
                  fz="sm"
                  py={6}
                  onClick={onAddPartBelow}
                >
                  Add Part Below
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  fz="sm"
                  py={6}
                  onClick={onDeletePart}
                >
                  Delete Part
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
        <Collapse in={questionOpened}>
          <Stack py="sm">
            <LabelValuePairs
              labelMinWidth={140}
              data={[
                {
                  label: 'Instruction',
                  value: renderReadAndAudio(
                    {
                      content: instructionText ?? '',
                      title: `Instruction of Part ${order}`,
                    },
                    {
                      src: instructionAudioUrl,
                    },
                  ),
                },
              ]}
            />

            <Box>{children}</Box>
          </Stack>
        </Collapse>
      </Paper>
    </Box>
  );
}
