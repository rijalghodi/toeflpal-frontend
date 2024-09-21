'use client';

import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { useDrawer } from '@/contexts';
import { AudioTriggerButton, ReadTriggerButton } from '@/elements';
import { referenceList, referenceListKey } from '@/services';

import { ReferenceCreate } from './ReferenceCreate';

const batchSize = 15;

type Props = {
  expectedHeight?: number | string;
};
export function ReferenceList({ expectedHeight }: Props) {
  const q = useQueryClient();
  const { push } = useRouter();
  const { open, close } = useDrawer();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [searchDebounced] = useDebouncedValue(search, 400);
  const prevDebounceSearchRef = useRef(searchDebounced);
  const [records, setRecords] = useState<
    {
      no: number;
      name?: string;
      audio?: string;
      text?: string;
    }[]
  >([]);

  const { data: references, isLoading } = useQuery({
    queryKey: referenceListKey({
      search: searchDebounced ?? undefined,
      page,
      limit: batchSize,
    }),
    queryFn: () =>
      referenceList({ search: searchDebounced, page, limit: batchSize }),
  });

  const handleCreateToefl = async () => {
    open({
      title: 'Create Reference',
      content: (
        <ReferenceCreate
          onSuccess={() => {
            q.invalidateQueries({
              queryKey: referenceListKey({ search: searchDebounced, page }),
            });
            close();
          }}
        />
      ),
    });
  };

  const loadMoreRecords = () => {
    if (records.length < (references?.pagination?.totalData ?? 0)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (references?.data) {
      setRecords((prevRecords) => [
        ...prevRecords,
        ...references.data?.map(({ audio, text, name }, idx) => ({
          name,
          audio: audio?.url,
          text,
          no: (page - 1) * batchSize + idx + 1,
        })),
      ]);
      prevDebounceSearchRef.current = searchDebounced;
    }
  }, [references, searchDebounced, page]);

  useEffect(() => {
    if (prevDebounceSearchRef.current !== searchDebounced) {
      setRecords?.([]);
      setPage(1);
    }
  }, [searchDebounced]);

  return (
    <Stack gap="md">
      <Group justify="space-between" w="100%">
        <TextInput
          value={search}
          miw={300}
          onChange={(e) => setSearch(e.target.value)}
          leftSection={<IconSearch size={16} />}
          leftSectionWidth={40}
          placeholder="Search"
        />

        <Button
          leftSection={<IconPlus size={16} />}
          onClick={handleCreateToefl}
        >
          Add Reference
        </Button>
      </Group>
      <DataTable
        height={500}
        fetching={isLoading}
        withRowBorders
        verticalSpacing="sm"
        horizontalSpacing="sm"
        highlightOnHover
        columns={[
          { accessor: 'no', title: 'No', width: 50 },
          { accessor: 'name', title: 'Name' },
          {
            accessor: 'audio',
            width: 100,
            title: 'Audio',
            textAlign: 'center',
          },
          { accessor: 'text', width: 100, title: 'Text', textAlign: 'center' },
        ]}
        records={records?.map((item, idx) => ({
          name: item.name,
          audio: item.audio ? (
            <AudioTriggerButton src={item.audio} title={item.name} />
          ) : null,
          text: item.text ? (
            <ReadTriggerButton content={item.text} title={item.name} />
          ) : null,
          no: idx + 1,
        }))}
        onScrollToBottom={loadMoreRecords}
      />
    </Stack>
  );
}
