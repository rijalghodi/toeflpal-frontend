import { Paper, Stack, Title } from '@mantine/core';
import React from 'react';

import { ToeflPremiumSectionItem } from './ToeflPremiumSectionItem';
import { ToeflPublishSectionItem } from './ToeflPublishSectionItem';

type Props = {
  toeflId: string;
};
export function ToeflPublicationSection({ toeflId }: Props) {
  return (
    <Paper withBorder p="md" radius="md">
      <Stack>
        <Title order={2} fz="xs" fw="700" tt="uppercase">
          Publication
        </Title>
        <ToeflPublishSectionItem toeflId={toeflId} />
        <ToeflPremiumSectionItem toeflId={toeflId} />
      </Stack>
    </Paper>
  );
}
