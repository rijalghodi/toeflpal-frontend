import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ReferenceCreateRequest = {
  name?: string;
  text?: string;
  audio?: File | null;
};

type ReferenceCreateResponse = GResponse<{
  id: string;
}>;

export const referenceCreate = async ({
  name,
  text,
  audio,
}: ReferenceCreateRequest): Promise<ReferenceCreateResponse> => {
  const formData = new FormData();

  if (name) formData.append('name', name);
  if (text) formData.append('text', text);
  if (audio) formData.append('audio', audio);

  const response = await axiosInstance.post<ReferenceCreateResponse>(
    `/reference`,
    formData,
    {
      headers: {
        'Content-Type': 'multireference/form-data',
      },
    },
  );

  return response.data;
};
