import {
  Badge,
  Center,
  Group,
  Loader,
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

import { listToefl } from '@/services/toefl/list-toefl';

type Props = {};
export function ToeflList(props: Props) {
  const [published, setPublished] = useState<string | null>('');

  // Read user

  const { data, isPending } = useQuery({
    queryKey: ['list-toefl-admin', published],
    queryFn: () => listToefl({ published: true }),
  });

  if (isPending) {
    return (
      <Center h={300} w="100%">
        <Loader />
      </Center>
    );
  }

  return (
    <Stack>
      {}
      <Select
        label="Status"
        data={[
          { label: 'Published', value: '1' },
          { label: 'Draft', value: '0' },
          { label: 'All', value: '' },
        ]}
        value={published}
        onChange={setPublished}
        w={150}
        allowDeselect={false}
      />
      <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
        {data?.data.map((toefl) => (
          <Paper
            radius="md"
            withBorder  
            p="md"
            component={Link}
            href={`/app/simulation/${toefl.id}`}
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
