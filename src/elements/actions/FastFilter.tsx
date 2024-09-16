import { Button, Menu, Tooltip } from '@mantine/core';
import React from 'react';

type Props = {
  value: string;
  data: {
    label: string;
    value: string;
  }[];
  title: string;
  onChange?: (value: string) => void;
  width?: number | string;
};
export function FastFilter(props: Props) {
  return (
    <Menu shadow="sm">
      <Menu.Target>
        <Tooltip label={props.title} withArrow>
          <Button
            variant="subtle"
            color="gray"
            c="dark.5"
            size="compact-xs"
            w={props.width}
          >
            {props.data.find((item) => item.value === props.value)?.label}
          </Button>
        </Tooltip>
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
  );
}
