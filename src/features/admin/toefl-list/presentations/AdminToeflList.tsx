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
        {data?.map((toefl, idx) => (
          <Paper
            radius="md"
            withBorder
            p="md"
            component={Link}
            href={toefl.href}
            className={cls.hovered}
            key={idx}
          >
            <Group justify="space-between" wrap="nowrap">
              <Text fw={400} fz="sm">
                {toefl.name}
              </Text>
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
