import {
  Group,
  Pagination,
  Paper,
  Pill,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { IconCircleCheckFilled, IconCrown } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';

import { LoadingState } from '@/elements/feedbacks/LoadingState';
import { toeflList, toeflListKey } from '@/services';
import { evalList, evalListKey } from '@/services/eval/eval-list';
import { routes } from '@/utils/constant/routes';

import cls from './styles.module.css';

type Props = {
  expectedHeight?: number | string;
};

export function ToeflList({ expectedHeight }: Props) {
  const [page, setPage] = useState(1);

  const { data: toeflData, isLoading: loadingToefl } = useQuery({
    queryKey: toeflListKey({ published: true, limit: 20, page }),
    queryFn: () => toeflList({ published: true, limit: 20, page }),
  });

  const { data: evalData } = useQuery({
    queryKey: evalListKey(),
    queryFn: evalList,
  });

  if (loadingToefl) {
    return <LoadingState h={expectedHeight} />;
  }

  const getScoreText = (toeflId: string) => {
    const evalForToefl = evalData?.data?.find((ev) => ev.toefl.id === toeflId);
    return evalForToefl ? (
      <Group gap={4}>
        <IconCircleCheckFilled color="#5c7cfa" size={16} />
        {evalForToefl.totalScore && (
          <Text c="dimmed" fz="sm">
            {evalForToefl.totalScore}/{evalForToefl.maxScore}
          </Text>
        )}
      </Group>
    ) : (
      <Pill>No Attempt</Pill>
    );
  };

  const renderToeflItem = (toefl: any) => (
    <Paper
      key={toefl.id}
      radius="md"
      withBorder
      p="md"
      component={Link}
      href={routes.toeflDetail(toefl.id)}
      className={cls.hovered}
    >
      <Stack gap="sm">
        <Group gap="sm" wrap="nowrap" align="flex-start">
          {toefl.premium && <IconCrown color="orange" title="Premium" />}
          <Text fw={400} fz="md">
            {toefl.name}
          </Text>
        </Group>
        <Group>{getScoreText(toefl.id)}</Group>
      </Stack>
    </Paper>
  );

  const renderPaginationText = () => {
    const { page, pageSize, totalData } = toeflData?.pagination ?? {};
    const start = ((page ?? 1) - 1) * (pageSize ?? 0) + 1;
    const end = (page ?? 1) * (pageSize ?? 0);

    return `${start} - ${end} / ${totalData}`;
  };

  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
        {toeflData?.data?.map(renderToeflItem)}
      </SimpleGrid>
      <Group justify="space-between" w="100%">
        <Text fz="sm">{renderPaginationText()}</Text>
        <Pagination
          total={toeflData?.pagination.totalPage ?? 0}
          value={page}
          onChange={setPage}
        />
      </Group>
    </Stack>
  );
}
