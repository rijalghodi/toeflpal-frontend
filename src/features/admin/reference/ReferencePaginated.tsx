'use client';

import {
  ActionIcon,
  Button,
  Group,
  Pill,
  Stack,
  TextInput,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconEdit, IconPlus, IconSearch } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';

import { useDrawer } from '@/contexts';
import { referenceList, referenceListKey } from '@/services';

import { ReferenceCreate } from './ReferenceCreate';
import { ReferenceUpdate } from './ReferenceUpdate';
import { ReferenceView } from './ReferenceView';

const PAGE_SIZE = 15;

export function ReferencePaginated() {
  const q = useQueryClient();
  const { open: openDrawer, close: closeDrawer } = useDrawer();
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
    openDrawer({
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
            closeDrawer();
          }}
        />
      ),
    });
  };

  const handleUpdateReference = async (referenceId: string) => {
    const ref = references?.find((ref) => ref.id === referenceId);
    openDrawer({
      title: `Update Reference`,
      size: 'md',
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
            closeDrawer();
          }}
        />
      ),
    });
  };
  const handleViewReference = async (referenceId: string) => {
    const ref = references?.find((ref) => ref.id === referenceId);
    openDrawer({
      title: `View Reference`,
      size: 'lg',
      content: (
        <ReferenceView
          initValues={{
            name: ref?.name,
            audioUrl: ref?.audio?.url,
            text: ref?.text,
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
          Reference
        </Button>
      </Group>
      <DataTable
        height="calc(100vh - 200px)"
        mah={740}
        fetching={isLoading || isFetching}
        withRowBorders
        striped
        highlightOnHover
        verticalSpacing="sm"
        horizontalSpacing="sm"
        onRowClick={({ record }) => handleViewReference(record.id)}
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
            title: 'Action',
            textAlign: 'center',
            width: 100,
            render: (item) => (
              <Group gap={4} justify="center" wrap="nowrap">
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateReference(item.id);
                  }}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={references?.map((item, idx) => ({
          name: item.name,
          audio: item.audio?.url ? <Pill>Audio</Pill> : null,
          text: item.text ? <Pill>Text</Pill> : null,
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
