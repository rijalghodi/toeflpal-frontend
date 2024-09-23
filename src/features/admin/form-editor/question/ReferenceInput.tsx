'use client';

import {
  ActionIcon,
  Box,
  Group,
  InputWrapper,
  Paper,
  ScrollArea,
  Select,
  SelectProps,
  Stack,
  Text,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import React, { useEffect, useMemo, useState } from 'react';

import { useDrawerAlt } from '@/contexts';
import { AudioPlayer } from '@/elements';
import { referenceList, referenceListKey } from '@/services';

import { ReferenceCreate } from '../../reference/ReferenceCreate';
import { ReferenceUpdate } from '../../reference/ReferenceUpdate';

const PAGE_SIZE = 100;

type Props = Omit<SelectProps, 'data'> & {
  initValues?: {
    name: string;
    id: string;
  };
};

export function ReferenceInput({
  value,
  onChange,
  initValues,
  ...slcProps
}: Props) {
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

  const init = data?.data.find((v) => v.id === value);
  const [safeHtml, setSafeHtml] = useState(init?.text ?? '');
  const [audioUrl, setAudioUrl] = useState(init?.audio?.url ?? '');

  const options = useMemo(
    () =>
      data?.data.map((v) => ({ label: v.name || 'No Name', value: v.id })) ||
      [],
    [data],
  );

  const handleChange = (val: string | null) => {
    const ref = data?.data.find((v) => v.id === val);
    setSafeHtml(DOMPurify.sanitize(ref?.text || ''));
    setAudioUrl(ref?.audio?.url || '');
  };

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

  const handleUpdateReference = (referenceId: string) => {
    const ref = data?.data.find((v) => v.id === referenceId);
    openDrawer({
      title: 'Update Reference',
      content: (
        <ReferenceUpdate
          referenceId={referenceId}
          initValues={{
            name: ref?.name,
            text: ref?.text,
            audioUrl: ref?.audio?.url,
          }}
          onSuccess={() => {
            refetch();
            closeDrawer();
          }}
        />
      ),
    });
  };

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
          value={value}
          onSearchChange={setSearch}
          comboboxProps={{ shadow: 'xs' }}
          onChange={(val, opt) => {
            onChange?.(val, opt);
            handleChange(val);
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

      <Paper visibleFrom="md">
        <Stack>
          <InputWrapper label="Reference Text">
            <Paper pos="relative">
              {safeHtml && (
                <ActionIcon
                  size="lg"
                  title="Edit text"
                  pos="absolute"
                  variant="default"
                  opacity={0.5}
                  right={20}
                  top={0}
                  onClick={() => value && handleUpdateReference(value)}
                  style={{ zIndex: 251 }}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              )}
              <ScrollArea.Autosize
                mah="calc(100vh - 300px)"
                px="sm"
                scrollbarSize={5}
              >
                {safeHtml ? (
                  <Box dangerouslySetInnerHTML={{ __html: safeHtml }} />
                ) : (
                  <Text>-</Text>
                )}
              </ScrollArea.Autosize>
            </Paper>
          </InputWrapper>

          <InputWrapper label="Reference Audio">
            <AudioPlayer src={audioUrl} />
          </InputWrapper>
        </Stack>
      </Paper>
    </Stack>
  );
}
