import { Button, Group, Menu, Text } from '@mantine/core';
import { IconTriangleInvertedFilled } from '@tabler/icons-react';
import React from 'react';

type Props = {
  title?: string;
  data: {
    label: string;
    value: string;
  }[];
  value?: string | null;
  onChange?: (value: string) => void;
  width?: number | string;
};
export function FastFilter(props: Props) {
  return (
    <Group gap={4}>
      <Text fz="xs" c="dimmed">
        {props.title ?? 'Filter'} :
      </Text>
      <Menu shadow="sm">
        <Menu.Target>
          <Button
            variant="subtle"
            color="gray"
            c="dark.5"
            size="compact-xs"
            w={props.width}
            rightSection={<IconTriangleInvertedFilled size={8} />}
          >
            {props.data.find((item) => item.value === props.value)?.label}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {props.data.map((v) => (
            <Menu.Item
              key={v.value}
              onClick={() => props.onChange?.(v.value)}
              color={v.value === props.value ? 'violet' : undefined}
            >
              {v.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
