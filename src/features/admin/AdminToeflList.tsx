import {
  Badge,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { IconCrown } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';

import { LoadingState } from '@/elements/feedbacks/LoadingState';
import { listToefl } from '@/services/toefl/list-toefl';
import { routes } from '@/utils/constant/routes';

type Props = {
  expectedHeight?: number | string;
};
export function AdminToeflList({ expectedHeight }: Props) {
  const [published, setPublished] = useState<string | null>('');

  // Read user

  const { data, isPending } = useQuery({
    queryKey: ['admin-toefl-list', published],
    queryFn: () => listToefl({ published: true }),
  });

  if (isPending) {
    return <LoadingState h={expectedHeight} />;
  }

  return (
    <Stack gap="md">
      <Select
        label="Status"
        data={[
          { label: 'Published', value: '1' },
          { label: 'Draft', value: '0' },
          { label: 'All', value: '' },
        ]}
        value={published}
        onChange={setPublished}
        w={200}
        allowDeselect={false}
      />
      <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
        {data?.data.map((toefl) => (
          <Paper
            radius="md"
            withBorder
            p="md"
            component={Link}
            href={routes.adminToeflDetail(toefl.id)}
          >
            <Group justify="space-between">
              <Text>{toefl.name}</Text>
              <Group>
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
