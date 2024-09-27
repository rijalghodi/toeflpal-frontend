import { Button, CheckIcon, Group, Radio, Stack, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconX } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { RichTextEditorInput } from '@/elements';
import {
  keyGet,
  keyGetKey,
  keyUpdate,
  optionCreate,
  optionList,
  optionListKey,
} from '@/services';

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

  const { data: answerKey, refetch: refetchKey } = useQuery({
    queryKey: keyGetKey({ questionId }),
    queryFn: () => keyGet({ questionId }),
  });

  const { mutate: updateKey, isPending } = useMutation({
    mutationFn: keyUpdate,
    onSuccess: () => {
      refetchKey();
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

  const [explanation, setExplanation] = useState(answerKey?.data.explanation);
  const [debExplanation, cancelDebExplanation] = useDebouncedValue(
    explanation,
    1000,
  );

  useEffect(() => {
    updateKey({ questionId, explanation: debExplanation });
    return () => {
      cancelDebExplanation();
    };
  }, [debExplanation]); // eslint-disable-line

  return (
    <Stack gap="md">
      <Radio.Group
        value={answerKey?.data?.option?.id}
        onChange={(value) => updateKey({ optionId: value, questionId })}
      >
        <Stack gap={8}>
          {options?.data?.map(({ id, text }, idx) => (
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
      <RichTextEditorInput
        label="Explanation"
        value={answerKey?.data.explanation}
        onChange={(val) => setExplanation(String(val))}
        mah={400}
      />
      {isPending && (
        <Text fz="xs" c="gray.3">
          Saving...
        </Text>
      )}
    </Stack>
  );
}
