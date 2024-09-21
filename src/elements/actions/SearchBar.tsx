'use client';

import { Button, MantineRadius, MantineSize, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';

type Props = {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  value?: string;
  size?: MantineSize;
  radius?: MantineRadius;
  width?: number | string;
  miw?: number | string;
};
export function SearchBar({
  placeholder,
  onSearch,
  value,
  size = 'md',
  radius = 'md',
  width,
  miw,
}: Props) {
  const [searchTerm, setSearchTerm] = useState(value ?? '');
  return (
    <TextInput
      width={width}
      miw={miw}
      radius={radius}
      size={size}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSearch?.(searchTerm);
        }
      }}
      rightSection={
        <Button
          size={size}
          onClick={() => onSearch?.(searchTerm)}
          variant="light"
          styles={{
            root: {
              borderRadius: `0px var(--mantine-radius-${radius}) var(--mantine-radius-${radius}) 0px`,
              position: 'absolute',
              right: 0,
            },
          }}
        >
          Cari
        </Button>
      }
      rightSectionWidth={68}
      rightSectionProps={{
        'aria-label': 'Jalankan Pencarian',
      }}
      leftSection={<IconSearch size={18} />}
      leftSectionWidth={36}
      placeholder={placeholder ?? 'Cari'}
    />
  );
}
