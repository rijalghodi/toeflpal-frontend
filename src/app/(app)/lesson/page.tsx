import { Stack, Title } from '@mantine/core';
import React from 'react';

import { ComingSoon } from '@/elements/feedbacks/ComingSoon';

export default function LessonPage() {
  return (
    <Stack>
      <Title fw={600} order={1} fz="h2">
        Lesson
      </Title>
      <ComingSoon />
    </Stack>
  );
}
