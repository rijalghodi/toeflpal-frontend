'use client';

import { SemiCircleProgress, Stack, Text } from '@mantine/core';
import React from 'react';

type Props = {
  score: number;
  totalScore: number;
};
export function ToeflScoreRing({ score, totalScore }: Props) {
  // Get score in evaluation
  return (
    <Stack align="center" gap={5}>
      <SemiCircleProgress
        value={90}
        size={150}
        thickness={8}
        label={score}
        styles={{ label: { fontSize: 24, fontWeight: 700 } }}
      />
      <Text fz="xs">out of {totalScore}</Text>
    </Stack>
  );
}
