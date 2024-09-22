import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Flex,
  Group,
  Menu,
  Paper,
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

type Props = {
  children: React.ReactNode;
  name?: string;
  order?: number;
  onAddQuestion?: () => void;
  onDeletePart?: () => void;
  onEditPart?: () => void;
  onAddPartBelow?: () => void;
};

export function PartWrapper({
  children,
  name,
  order,
  onAddPartBelow,
  onAddQuestion,
  onEditPart,
  onDeletePart,
}: Props) {
  const [questionOpened, { toggle: toggleQuestions }] = useDisclosure(true);

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
                  fz="xs"
                  py={6}
                  onClick={onEditPart}
                >
                  Edit Part
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconRowInsertTop size={14} />}
                  fz="xs"
                  py={6}
                  onClick={onAddPartBelow}
                >
                  Add Part Below
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  fz="xs"
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
          <Box pb="sm">{children}</Box>
        </Collapse>
        {/* <Group w="100%" justify="center">
          <Button
            size="compact-sm"
            variant="subtle"
            color="gray"
            onClick={toggleQuestions}
            w={100}
          >
            {questionOpened ? (
              <IconChevronCompactUp size={20} />
            ) : (
              <IconChevronCompactDown size={20} />
            )}
          </Button>
        </Group> */}
      </Paper>
    </Box>
  );
}
