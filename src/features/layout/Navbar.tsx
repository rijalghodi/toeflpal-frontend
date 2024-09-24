'use client';

import { Group, NavLink, Stack, Text } from '@mantine/core';
import {
  IconAlignJustified,
  IconBolt,
  IconBrandSpeedtest,
  IconPlayerPlay,
  IconSchool,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useUser } from '@/contexts/UserContext';
import { routes } from '@/utils/constant/routes';

import classes from './styles.module.css';

const userNavs = [
  {
    label: 'Dashboard',
    href: routes.dashboard,
    icon: <IconBrandSpeedtest size={16} />,
  },
  {
    label: 'Simulation',
    href: routes.toeflList,
    icon: <IconPlayerPlay size={16} />,
  },
  {
    label: 'Practice',
    href: routes.practiceList,
    icon: <IconBolt size={16} />,
  },
  {
    label: 'Lesson',
    href: routes.lessonList,
    icon: <IconSchool size={16} />,
  },
];

const superAdminNavs = [
  {
    label: 'Simulation',
    href: routes.adminToeflList,
    icon: <IconPlayerPlay size={16} />,
  },
  {
    label: 'Practice',
    href: routes.adminPracticeList,
    icon: <IconBolt size={16} />,
  },
  {
    label: 'References',
    href: routes.adminReferenceList,
    icon: <IconAlignJustified size={16} />,
  },
  {
    label: 'Lesson',
    href: routes.adminLessonList,
    icon: <IconSchool size={16} />,
  },
];

type Props = {
  mobile?: boolean;
};
export function Navbar({ mobile }: Props) {
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: userSelfGetKey(),
  //   queryFn: userSelfGet,
  //   retry: false,
  // });

  const { user } = useUser();

  // if (isLoading) return <LoadingState h={150} />;

  // if (isError || !data?.data)
  //   return (
  //     <Group justify="center">
  //       <Text ta="center">Error</Text>
  //     </Group>
  //   );

  const navs = user?.roles.includes('superadmin') ? superAdminNavs : userNavs;

  const pathname = usePathname();

  function isActive(href: string): boolean {
    return (
      (href === '/' && pathname === '/') ||
      (href !== '/' && pathname.startsWith(href))
    );
  }

  if (mobile) {
    return (
      <Group px="sm" py={8} w="100%" justify="space-between" gap={0} bg="white">
        {navs.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${classes.menuLink} ${isActive(item.href) ? classes.activeMenu : ''}`}
          >
            <Stack align="center" gap={4} py={8} px={8}>
              {item.icon}
              <Text ta="center" fz={{ base: 'xs', xs: 'xs' }}>
                {item.label}
              </Text>
            </Stack>
          </Link>
        ))}
      </Group>
    );
  }

  return (
    <Stack gap={0}>
      {navs.map(({ href, icon, label }) => (
        <NavLink
          key={label}
          label={label}
          component={Link}
          href={href}
          leftSection={icon}
          className={isActive(href) ? classes.activeMenu : ''}
        />
      ))}
    </Stack>
  );
}
