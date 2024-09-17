'use client';

import { NavLink, Stack } from '@mantine/core';
import {
  IconBolt,
  IconBrandSpeedtest,
  IconPlayerPlay,
  IconSchool,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

import { LoadingState } from '@/elements/feedbacks/LoadingState';
import { getProfile } from '@/services/user/profile.service';
import { routes } from '@/utils/constant/routes';

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
    label: 'Lesson',
    href: routes.adminLessonList,
    icon: <IconSchool size={16} />,
  },
];

export function Navbar() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (isLoading) return <LoadingState h={150} />;
  if (isError || !data?.data) return null;

  const navs = data.data.roles.includes('superadmin')
    ? superAdminNavs
    : userNavs;

  return (
    <Stack gap={0}>
      {navs.map(({ href, icon, label }) => (
        <NavLink
          key={label}
          label={label}
          component={Link}
          href={href}
          leftSection={icon}
        />
      ))}
    </Stack>
  );
}
