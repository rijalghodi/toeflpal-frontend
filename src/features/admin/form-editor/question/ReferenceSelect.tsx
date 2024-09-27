'use client';

import { ActionIcon, Group, Select, SelectProps, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';

import { useDrawerAlt } from '@/contexts';
import { referenceList, referenceListKey } from '@/services';

import { ReferenceCreate } from '../../reference/ReferenceCreate';

const PAGE_SIZE = 100;

type Props = {
  initValues?: {
    name: string;
    id: string;
  };
  onChange: (value: string | null, text?: string) => void;
} & Omit<SelectProps, 'onChange'>;

export function ReferenceSelect({ initValues, onChange, ...slcProps }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [searchDebounced] = useDebouncedValue(search, 400);

  const { data, isLoading, refetch } = useQuery({
    queryKey: referenceListKey({
      search: searchDebounced,
      page,
      limit: PAGE_SIZE,
    }),
    queryFn: () =>
      referenceList({ search: searchDebounced, page, limit: PAGE_SIZE }),
  });

  const options = useMemo(
    () =>
      data?.data.map((v) => ({
        label: v.name || 'No Name',
        value: v.id,
        longText: v.text,
      })) || [],
    [data],
  );

  useEffect(() => setPage(1), [searchDebounced]);

  const { open: openDrawer, close: closeDrawer } = useDrawerAlt();

  const handleAddReference = () =>
    openDrawer({
      title: 'Add Reference',
      content: (
        <ReferenceCreate
          onSuccess={() => {
            refetch();
            closeDrawer();
          }}
        />
      ),
    });

  return (
    <Stack>
      <Group align="flex-end">
        <Select
          flex={1}
          clearable
          data={
            isLoading
              ? [{ label: 'Loading...', value: '#####', disabled: true }]
              : !search && initValues?.name
                ? [
                    { label: initValues.name, value: initValues.id },
                    ...options.filter((val) => val.value !== initValues.id),
                  ]
                : options
          }
          searchable
          searchValue={search}
          onSearchChange={setSearch}
          comboboxProps={{ shadow: 'xs' }}
          onChange={(v) => {
            onChange(v, options.find((val) => val.value === v)?.longText);
          }}
          {...slcProps}
        />

        <ActionIcon
          size="lg"
          title="Add new reference"
          onClick={handleAddReference}
          variant="default"
        >
          <IconPlus size={16} />
        </ActionIcon>
      </Group>
    </Stack>
  );
}
