import {
  ActionIcon,
  Badge,
  Group,
  Paper,
  Pill,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { IconCrown, IconPlayerPlay } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

import { LoadingState } from '@/elements/feedbacks/LoadingState';
import { toeflList, toeflListKey } from '@/services';
import { routes } from '@/utils/constant/routes';
import cls from './styles.module.css';

type Props = {
  expectedHeight?: number | string;
};
export function ToeflList({ expectedHeight }: Props) {
  const { data, isPending } = useQuery({
    queryKey: toeflListKey({ published: true }),
    queryFn: () => toeflList({ published: true }),
  });

  // Get attempt

  if (isPending) {
    return <LoadingState h={expectedHeight} />;
  }

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
      {data?.data?.map((toefl, idx) => (
        <Paper
          radius="md"
          withBorder
          p="md"
          component={Link}
          href={routes.toeflDetail(toefl.id)}
          className={cls.hovered}
          key={idx}
        >
          <Stack gap="sm">
            <IconPlayerPlay size={20} color="#5c7cfa" />
            <Group justify="space-between" wrap="nowrap">
              <Text fw={400} fz="md">
                {toefl.name}
              </Text>
              <Group>
                {toefl.premium && <IconCrown color="orange" title="Premium" />}
              </Group>
            </Group>
            <Group>
              <Pill>No Attempt</Pill>
            </Group>
          </Stack>
        </Paper>
      ))}
    </SimpleGrid>
  );
}
