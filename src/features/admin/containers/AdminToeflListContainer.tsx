import { Button, Group, Select, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { createToefl } from '@/services/toefl/create-toefl';
import { listToefl } from '@/services/toefl/list-toefl';
import { routes } from '@/utils/constant/routes';

import { AdminToeflList } from '../presentations/AdminToeflList';

type Props = {
  expectedHeight?: number | string;
};
export function AdminToeflListCotainer({ expectedHeight }: Props) {
  const q = useQueryClient();
  const { push } = useRouter();
  const [published, setPublished] = useState<string | null>('');

  const { data: toefls, isLoading } = useQuery({
    queryKey: ['admin-toefl-list', published],
    queryFn: () => listToefl({ published }),
  });

  // Create TOEFL
  const { isPending: loadingCreate, mutateAsync: createToeflMutate } =
    useMutation({
      mutationKey: ['create-toefl'],
      mutationFn: createToefl,
      onSuccess: (data) => {
        push(routes.adminToeflDetail(data.data.id));
        q.invalidateQueries({ queryKey: ['admin-toefl-list', published] });
      },
    });

  const handleCreateToefl = async () => {
    await createToeflMutate({
      name: 'Untitled TOEFL',
    });
  };
  return (
    <Stack gap="md">
      <Group justify="space-between" w="100%">
        <Select
          label="Status"
          data={[
            { label: 'Published', value: 'true' },
            { label: 'Draft', value: 'false' },
            { label: 'All', value: '' },
          ]}
          value={published}
          onChange={setPublished}
          w={200}
          allowDeselect={false}
        />
        <Button
          leftSection={<IconPlus size={16} />}
          loading={loadingCreate}
          onClick={handleCreateToefl}
        >
          Create TOEFL
        </Button>
      </Group>

      <AdminToeflList
        loading={isLoading}
        expectedHeight={expectedHeight ?? 400}
        data={toefls?.data.map(({ id, name, premium, publishedAt }) => ({
          href: `/toefl/${id}`,
          name,
          premium,
          published: !!publishedAt,
        }))}
      />
    </Stack>
  );
}
