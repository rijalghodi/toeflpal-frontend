import {
  ActionIcon,
  Avatar,
  NavLink,
  Popover,
  Stack,
  Text,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { truncate } from 'lodash';
import { useRouter } from 'next/navigation';
import React from 'react';

import { removeAuthCookie, userSelfGet, userSelfGetKey } from '@/services';
import { routes } from '@/utils/constant/routes';

export function UserAvatar() {
  const q = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: userSelfGetKey(),
    queryFn: () => userSelfGet(),
  });

  const handleLogout = () => {
    q.removeQueries();
    removeAuthCookie();
    router.push(routes.home);
  };
  return (
    <Popover radius="md" shadow="xs" width={200}>
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          radius="xl"
          size="xl"
          disabled={isLoading}
        >
          <Avatar radius="xl" name={data?.data.email} color="indigo" />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p="xs">
        <Stack>
          <Text fz="sm" px="sm" pt="xs">
            {truncate(data?.data.email, { length: 20, omission: '..' })}
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
