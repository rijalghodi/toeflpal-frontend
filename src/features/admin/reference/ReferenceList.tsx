'use client';

import { ActionIcon, Button, Group, Stack, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconEdit, IconPlus, IconSearch } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useRef, useState } from 'react';

import { useDrawer } from '@/contexts';
import { AudioTriggerButton, ReadTriggerButton } from '@/elements';
import { referenceList, referenceListKey } from '@/services';

import { ReferenceCreate } from './ReferenceCreate';
import { ReferenceUpdate } from './ReferenceUpdate';

const batchSize = 15;

export function ReferenceList() {
  const q = useQueryClient();
  const { open: openDrawer, close: closeDrawer } = useDrawer();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [searchDebounced] = useDebouncedValue(search, 400);
  const prevDebounceSearchRef = useRef(searchDebounced);
  const [records, setRecords] = useState<
    {
      no: number;
      id: string;
      name?: string;
      audioUrl?: string;
      text?: string;
    }[]
  >([]);

  const {
    data: references,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: referenceListKey({
      search: searchDebounced ?? undefined,
      page,
      limit: batchSize,
    }),
    queryFn: () =>
      referenceList({ search: searchDebounced, page, limit: batchSize }),
  });

  const handleCreateReference = async () => {
    openDrawer({
      title: 'Create Reference',
      content: (
        <ReferenceCreate
          onSuccess={() => {
            setPage(1);
            setRecords([]);
            refetch();
            q.refetchQueries({
              queryKey: referenceListKey({
                search: '',
                page: 1,
                limit: batchSize,
              }),
            });
            closeDrawer();
          }}
        />
      ),
    });
  };

  const handleUpdateReference = async (referenceId: string) => {
    openDrawer({
      title: 'Update Reference',
      content: (
        <ReferenceUpdate
          referenceId={referenceId}
          initValues={{
            name: records.find((ref) => ref.id === referenceId)?.name,
            audioUrl: records.find((ref) => ref.id === referenceId)?.audioUrl,
            text: records.find((ref) => ref.id === referenceId)?.text,
          }}
          onSuccess={() => {
            q.invalidateQueries({
              queryKey: referenceListKey({ search: searchDebounced, page }),
            });
            closeDrawer();
          }}
        />
      ),
    });
  };

  // --- Infinite Scroll ---
  const loadMoreRecords = () => {
    if (records.length < (references?.pagination?.totalData ?? 0)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (references?.data) {
      setRecords((prevRecords) => [
        ...prevRecords,
        ...references.data?.map(({ audio, text, name, id }, idx) => ({
          id,
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
          onClick={handleCreateReference}
        >
          Reference
        </Button>
      </Group>
      <DataTable
        height="calc(100vh - 300px)"
        fetching={isLoading || isFetching}
        withRowBorders
        verticalSpacing="sm"
        horizontalSpacing="sm"
        highlightOnHover
        scrollAreaProps={{
          scrollbarSize: 5,
        }}
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
          {
            accessor: 'actions',
            title: '',
            textAlign: 'center',
            width: 40,
            render: (item) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="dark"
                  onClick={() => handleUpdateReference(item.id)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={records?.map((item, idx) => ({
          name: item.name,
          audio: item.audioUrl ? (
            <AudioTriggerButton src={item.audioUrl} title={item.name} />
          ) : null,
          text: item.text ? (
            <ReadTriggerButton content={item.text} title={item.name} />
          ) : null,
          no: idx + 1,
          id: item.id,
        }))}
        onScrollToBottom={loadMoreRecords}
      />
    </Stack>
  );
}
