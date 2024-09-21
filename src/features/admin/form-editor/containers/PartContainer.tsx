import React from 'react';

import { useDrawer } from '@/contexts';

import { PartWrapper } from '../presentations/PartWrapper';
import { PartCreate } from './PartCreate';
import { PartUpdate } from './PartUpdate';

type Props = {
  partId: string;
  formId: string;
  order: number;
  name?: string;
  instruction?: string;
  instructionAudioUrl?: string;
  closing?: string;
  closingAudioUrl?: string;
};
export function PartContainer({
  formId,
  partId,
  order,
  name,
  instruction,
  instructionAudioUrl,
  closing,
  closingAudioUrl,
}: Props) {
  const { open: openDrawer, close: closeDrawer } = useDrawer();

  // Get questions

  const handleAddPartBelow = () => {
    openDrawer({
      content: (
        <PartCreate formId={formId} order={order + 1} onSuccess={closeDrawer} />
      ),
      title: 'Add New Part',
    });
  };

  const handleEditPart = () => {
    openDrawer({
      content: (
        <PartUpdate
          formId={formId}
          partId={partId}
          onSuccess={closeDrawer}
          initValues={{
            name: name,
            closing,
            instruction,
            instructionAudioUrl,
            closingAudioUrl,
          }}
        />
      ),
      title: 'Edit Part',
    });
  };

  return (
    <PartWrapper
      name={name}
      order={order}
      onAddPartBelow={handleAddPartBelow}
      onEditPart={handleEditPart}
    >
      Questions
    </PartWrapper>
  );
}
