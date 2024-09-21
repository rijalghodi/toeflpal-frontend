import { Stack } from '@mantine/core';
import React from 'react';

import { FormGeneralInfo } from './containers/FormGeneralInfo';
import { PartsStack } from './containers/PartsStack';

type Props = {
  formId: string;
};
export function FormEditorMain({ formId }: Props) {
  return (
    <Stack>
      <FormGeneralInfo formId={formId} />
      <PartsStack formId={formId} />
    </Stack>
  );
}
