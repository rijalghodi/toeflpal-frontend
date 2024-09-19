import { Badge, Group, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconCrown } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

import { LoadingState } from '@/elements/feedbacks/LoadingState';
import { toeflList, toeflListKey } from '@/services';
import { routes } from '@/utils/constant/routes';

type Props = {
  expectedHeight?: number | string;
};
export function ToeflList({ expectedHeight }: Props) {
  const { data, isPending } = useQuery({
    queryKey: toeflListKey({ published: true }),
    queryFn: () => toeflList({ published: true }),
  });

  if (isPending) {
    return <LoadingState h={expectedHeight} />;
  }

  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
        {data?.data.map((toefl) => (
          <Paper
            radius="md"
            withBorder
            p="md"
            component={Link}
            href={routes.toeflList}
          >
            <Group justify="space-between">
              <Text>{toefl.name}</Text>
              <Group>
                <Badge variant="light" tt="capitalize">
                  Score: 500
                </Badge>
                <Badge variant="light" tt="capitalize" color="gray">
                  Draft
                </Badge>
                {toefl.premium && <IconCrown color="orange" title="Premium" />}
              </Group>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
