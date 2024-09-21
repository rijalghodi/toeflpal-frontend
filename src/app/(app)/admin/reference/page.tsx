import { Stack, Title } from '@mantine/core';
import React, { Suspense } from 'react';

import { ReferenceList } from '@/features/admin/reference/ReferenceList';

export default function ReferencePage() {
  return (
    <Stack>
      <Title fw={600} order={1} fz="h2">
        References
      </Title>
      <Suspense>
        <ReferenceList />
      </Suspense>
    </Stack>
  );
}
