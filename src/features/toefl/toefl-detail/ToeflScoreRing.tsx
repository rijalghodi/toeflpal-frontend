'use client';

import { SemiCircleProgress, Stack, Text } from '@mantine/core';
import React from 'react';

type Props = {
  score: number;
  maxScore: number;
};
export function ToeflScoreRing({ score, maxScore }: Props) {
  // Get score in evaluation
  return (
    <Stack align="center" gap={5}>
      <SemiCircleProgress
        value={(score / maxScore) * 100}
        size={150}
        thickness={8}
        label={`${score}`}
        styles={{ label: { fontSize: 24, fontWeight: 700 } }}
      />
      <Text fz="xs">out of {maxScore}</Text>
    </Stack>
  );
}
