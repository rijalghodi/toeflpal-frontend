import {
  ActionIcon,
  Avatar,
  Button,
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

import { removeAuthCookie, useUserSelf } from '@/services';
import { routes } from '@/utils/constant/routes';

export function UserAvatar() {
  const q = useQueryClient();
  const router = useRouter();

  const { user, loading } = useUserSelf();

  const handleLogout = () => {
    q.clear();
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
    <Popover radius="md" shadow="xs" width={250} position="bottom-end">
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
      <Popover.Dropdown p="md">
        <Stack gap={8}>
          <Text fz="sm" fw={600}>
            {user.roles[0]}
          </Text>
          <Text fz="sm">
            {truncate(user?.email, { length: 20, omission: '..' })}
          </Text>
          <Button
            leftSection={<IconLogout size={16} />}
            variant="light"
            color="dark"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
