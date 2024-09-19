import { Badge, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { IconCrown } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { LoadingState } from '@/elements/feedbacks/LoadingState';

import cls from './styles.module.css';

type AdminToefl = {
  name: string;
  published: boolean;
  premium: boolean;
  href: string;
};

type Props = {
  loading?: boolean;
  data?: AdminToefl[];
  expectedHeight?: number | string;
};
export function AdminToeflList({ loading, data, expectedHeight }: Props) {
  if (loading) {
    return <LoadingState h={expectedHeight} />;
  }

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
      {data?.map((toefl) => (
        <Paper
          radius="md"
          withBorder
          p="md"
          component={Link}
          href={toefl.href}
          className={cls.hovered}
        >
          <Group justify="space-between" wrap="nowrap">
            <Text fw={500}>{toefl.name}</Text>
            <Group>
              {!toefl.published && (
                <Badge variant="light" tt="capitalize" color="gray">
                  Draft
                </Badge>
              )}
              {toefl.premium && <IconCrown color="orange" title="Premium" />}
            </Group>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
}
