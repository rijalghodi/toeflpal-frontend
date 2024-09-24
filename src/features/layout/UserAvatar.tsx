import {
  ActionIcon,
  Avatar,
  Button,
  NavLink,
  Popover,
  Stack,
  Text,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { truncate } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useUser } from '@/contexts';
import { removeAuthCookie } from '@/services';
import { routes } from '@/utils/constant/routes';

export function UserAvatar() {
  const q = useQueryClient();
  const router = useRouter();

  const { user, loading } = useUser();

  const handleLogout = () => {
    q.removeQueries();
    removeAuthCookie();
    router.push(routes.home);
  };

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <Button variant="filled" component={Link} href={routes.auth.login}>
        Login
      </Button>
    );
  }

  return (
    <Popover radius="md" shadow="xs" width={200} position="bottom-end">
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          radius="xl"
          size="xl"
          disabled={loading}
        >
          <Avatar radius="xl" name={user?.email} color="indigo" />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p="xs">
        <Stack gap={0}>
          <Text fz="sm" px="sm" py="xs" c="indigo">
            {truncate(user?.email, { length: 20, omission: '..' })}
          </Text>
          <NavLink
            leftSection={<IconLogout size={16} />}
            variant="subtle"
            color="dark"
            onClick={handleLogout}
            label="Logout"
          ></NavLink>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
