'use client';

import { ActionIcon, Button, Group, Stack, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconEdit, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { useDrawer } from '@/contexts';
import { AudioTriggerButton, ReadTriggerButton } from '@/elements';
import { referenceList, referenceListKey } from '@/services';

import { ReferenceCreate } from './ReferenceCreate';
import { ReferenceUpdate } from './ReferenceUpdate';

const PAGE_SIZE = 15;

export function ReferencePaginated() {
  const q = useQueryClient();
  const { push } = useRouter();
  const { open, close } = useDrawer();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [searchDebounced] = useDebouncedValue(search, 400);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: referenceListKey({
      search: searchDebounced ?? undefined,
      page,
      limit: PAGE_SIZE,
    }),
    queryFn: () =>
      referenceList({ search: searchDebounced, page, limit: PAGE_SIZE }),
  });

  const references = data?.data;
  const pagination = data?.pagination;

  useEffect(() => {
    setPage(1);
  }, [searchDebounced]);

  const handleCreateReference = async () => {
    open({
      title: 'Create Reference',
      content: (
        <ReferenceCreate
          onSuccess={() => {
            q.invalidateQueries({
              queryKey: referenceListKey({
                search: '',
                page: 1,
                limit: PAGE_SIZE,
              }),
            });
            setPage(1);
            setSearch('');
            close();
          }}
        />
      ),
    });
  };

  const handleUpdateReference = async (referenceId: string) => {
    const ref = references?.find((ref) => ref.id === referenceId);
    open({
      title: 'Update Reference',
      content: (
        <ReferenceUpdate
          referenceId={referenceId}
          initValues={{
            name: ref?.name,
            audioUrl: ref?.audio?.url,
            text: ref?.text,
          }}
          onSuccess={() => {
            refetch();
            close();
          }}
        />
      ),
    });
  };

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
          Add Reference
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
          scrollbarSize: 3,
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
            title: 'Action',
            textAlign: 'center',
            width: 100,
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
        records={references?.map((item, idx) => ({
          name: item.name,
          audio: item.audio?.url ? (
            <AudioTriggerButton src={item.audio?.url} title={item.name} />
          ) : null,
          text: item.text ? (
            <ReadTriggerButton content={item.text} title={item.name} />
          ) : null,
          no: ((pagination?.page ?? 1) - 1) * PAGE_SIZE + idx + 1,
          id: item.id,
        }))}
        totalRecords={pagination?.totalData}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
      />
    </Stack>
  );
}
