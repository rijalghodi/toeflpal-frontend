import { Button, CheckIcon, Group, Radio, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { optionCreate, optionList, optionListKey } from '@/services';

import { OptionItem } from './OptionItem';

type Props = {
  questionId: string;
  onSuccess?: () => void;
};

export function OptionList({ questionId }: Props) {
  const { data: options, refetch: refetchOptions } = useQuery({
    queryKey: optionListKey({ questionId }),
    queryFn: () => optionList({ questionId }),
  });

  const { mutateAsync: createOption, isPending: loadingCreate } = useMutation({
    mutationFn: optionCreate,
    onSuccess: () => {
      refetchOptions();
    },
    onError: () => {
      notifications.show({
        message: 'Fail',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 3000,
      });
    },
  });

  return (
    <Stack gap="md">
      <Radio.Group>
        <Stack gap="xs">
          {options?.data.map(({ id, text }, idx) => (
            <Group w="100%" align="flex-start" key={idx}>
              <Radio
                pt={8}
                value={id}
                icon={CheckIcon}
                style={{ cursor: 'pointer' }}
                styles={{ root: { cursor: 'pointer' } }}
              />
              <OptionItem
                optionId={id}
                initValue={{ text }}
                onSuccessDelete={refetchOptions}
                onSuccessUpdate={refetchOptions}
              />
            </Group>
          ))}
        </Stack>
      </Radio.Group>
      <Group>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          color="dark"
          onClick={async () => await createOption({ questionId, text: '' })}
          size="xs"
          loading={loadingCreate}
        >
          Option
        </Button>
      </Group>
    </Stack>
  );
}
