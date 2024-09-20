import { Stack } from '@mantine/core';
import React from 'react';

import { FormGeneralInfo } from './containers/FormGeneralInfo';

type Props = {
  formId: string;
};
export function FormEditorMain({ formId }: Props) {
  return (
    <Stack>
      <FormGeneralInfo formId={formId} />
    </Stack>
  );
}
