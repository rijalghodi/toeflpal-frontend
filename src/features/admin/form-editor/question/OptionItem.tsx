import { CloseButton, Group, Loader, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

import { optionDelete, optionUpdate } from '@/services';

type Props = {
  optionId: string;
  onSuccessUpdate?: () => void;
  onSuccessDelete?: () => void;
  initValue?: {
    text?: string;
  };
};
export function OptionItem({
  onSuccessDelete,
  onSuccessUpdate,
  optionId,
  initValue,
}: Props) {
  const { mutateAsync: updateOption, isPending } = useMutation({
    mutationFn: optionUpdate,
    onSuccess: () => {
      onSuccessUpdate?.();
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
  const { mutateAsync: deleteOption } = useMutation({
    mutationFn: optionDelete,
    onSuccess: () => {
      onSuccessDelete?.();
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

  const [text, setText] = useState(initValue?.text);

  // Debounce the submit function
  const debouncedSubmit = useCallback(
    debounce(async (text?: string) => {
      await updateOption({ optionId, text });
    }, 2000), // 2 seconds debounce
    [updateOption],
  );

  useEffect(() => {
    debouncedSubmit(text);
    return () => {
      debouncedSubmit.cancel();
    };
  }, [text]); // eslint-disable-line

  return (
    <Group flex={1} align="flex-start">
      <TextInput
        variant="filled"
        placeholder="Type here"
        onChange={(e) => setText(e.target.value)}
        flex={1}
        rightSection={isPending ? <Loader size="xs" variant="oval" /> : null}
      />
      <CloseButton onClick={async () => await deleteOption({ optionId })} />
    </Group>
  );
}
