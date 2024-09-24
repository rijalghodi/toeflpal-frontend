'use client';

import { Badge, Button, Group, Stack, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import {
  IconCircleCheckFilled,
  IconCrown,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { FastFilter } from '@/elements';
import { toeflCreate, toeflList, toeflListKey } from '@/services';
import { routes } from '@/utils/constant/routes';

const PAGE_SIZE = 15;

export function AdminToeflPaginated() {
  const router = useRouter();

  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [searchDebounced] = useDebouncedValue(search, 500);
  const [published, setPublished] = useState<string | null>('');
  const [premium, setPremium] = useState<string | null>('');

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: toeflListKey({
      published,
      premium,
      limit: PAGE_SIZE,
      page,
      search: searchDebounced,
    }),
    queryFn: () =>
      toeflList({
        published,
        premium,
        limit: PAGE_SIZE,
        page,
        search: searchDebounced,
      }),
  });

  const toefls = data?.data;
  const pagination = data?.pagination;

  useEffect(() => {
    setPage(1);
  }, [searchDebounced, published]);

  // Create TOEFL
  const { isPending: loadingCreate, mutateAsync: createToeflMutate } =
    useMutation({
      mutationKey: ['create-toefl'],
      mutationFn: toeflCreate,
      onSuccess: (data) => {
        router.push(routes.adminToeflDetail(data.data.id));
        refetch();
      },
    });

  const handleCreateToefl = async () => {
    await createToeflMutate({
      name: 'Untitled',
    });
  };

  return (
    <Stack gap="md">
      <Group justify="space-between" w="100%">
        <Group gap="lg" flex={1}>
          <TextInput
            value={search}
            miw={250}
            maw={360}
            w="100%"
            onChange={(e) => setSearch(e.target.value)}
            leftSection={<IconSearch size={16} />}
            leftSectionWidth={40}
            placeholder="Search"
          />

          <Group wrap="nowrap">
            <FastFilter
              title="Premium"
              data={[
                { label: 'Premium', value: 'true' },
                { label: 'Free', value: 'false' },
                { label: 'All', value: '' },
              ]}
              value={premium}
              onChange={setPremium}
            />

            <FastFilter
              title="Status"
              data={[
                { label: 'Published', value: 'true' },
                { label: 'Draft', value: 'false' },
                { label: 'All', value: '' },
              ]}
              value={published}
              onChange={setPublished}
            />
          </Group>
        </Group>
        <Button
          leftSection={<IconPlus size={16} />}
          loading={loadingCreate}
          onClick={handleCreateToefl}
        >
          TOEFL
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
        onRowClick={({ record }) => router.push(`/admin/toefl/${record.id}`)}
        scrollAreaProps={{
          scrollbarSize: 3,
        }}
        columns={[
          { accessor: 'no', title: 'No', width: 50 },
          { accessor: 'name', title: 'Name' },
          {
            accessor: 'premium',
            width: 100,
            title: 'Premium',
            textAlign: 'center',
          },
          {
            accessor: 'published',
            width: 100,
            title: 'Published',
            textAlign: 'center',
          },
        ]}
        // records={[]}
        records={toefls?.map((item, idx) => ({
          name: item.name,
          premium: item.premium ? <IconCrown size={24} color="orange" /> : null,
          published: item.publishedAt ? (
            <IconCircleCheckFilled size={24} color="#40c057" />
          ) : (
            <Badge color="gray" size="xs">
              Draft
            </Badge>
          ),
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
