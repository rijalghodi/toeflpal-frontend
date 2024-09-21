import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type PartUpdateRequest = {
  formId: string;
  partId: string;
  name?: string;
  order?: number;
  instruction?: string;
  instructionAudio?: File | null;
  closing?: string;
  closingAudio?: File | null;
};

type PartUpdateResponse = GResponse<{
  id: string;
}>;

export const partUpdate = async ({
  formId,
  partId,
  name,
  order,
  instruction,
  instructionAudio,
  closing,
  closingAudio,
}: PartUpdateRequest): Promise<PartUpdateResponse> => {
  const formData = new FormData();

  if (name) formData.append('name', name);
  if (order) formData.append('order', String(order));
  if (instruction) formData.append('instruction', instruction);
  if (instructionAudio) formData.append('instructionAudio', instructionAudio);
  if (closing) formData.append('closing', closing);
  if (closingAudio) formData.append('closingAudio', closingAudio);

  const response = await axiosInstance.patch<PartUpdateResponse>(
    `/form/${formId}/part/${partId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
