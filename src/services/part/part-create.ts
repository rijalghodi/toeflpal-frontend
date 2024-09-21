import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type PartCreateRequest = {
  formId: string;
  name?: string;
  order?: number;
  instruction?: string;
  instructionAudio?: File | null;
  closing?: string;
  closingAudio?: File | null;
};

type PartCreateResponse = GResponse<{
  id: string;
}>;

export const partCreate = async ({
  formId,
  name,
  order,
  instruction,
  instructionAudio,
  closing,
  closingAudio,
}: PartCreateRequest): Promise<PartCreateResponse> => {
  const formData = new FormData();

  if (name) formData.append('name', name);
  if (order) formData.append('order', String(order));
  if (instruction) formData.append('instruction', instruction);
  if (instructionAudio) formData.append('instructionAudio', instructionAudio);
  if (closing) formData.append('closing', closing);
  if (closingAudio) formData.append('closingAudio', closingAudio);

  const response = await axiosInstance.post<PartCreateResponse>(
    `/form/${formId}/part`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
