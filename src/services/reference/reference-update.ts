import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ReferenceUpdateRequest = {
  referenceId: string;
  name?: string;
  text?: string;
  audio?: File | null;
};

type ReferenceUpdateResponse = GResponse<{
  id: string;
}>;

export const referenceUpdate = async ({
  referenceId,
  name,
  text,
  audio,
}: ReferenceUpdateRequest): Promise<ReferenceUpdateResponse> => {
  const formData = new FormData();

  if (name) formData.append('name', name);
  if (text) formData.append('text', text);
  if (audio) formData.append('audio', audio);

  const response = await axiosInstance.patch<ReferenceUpdateResponse>(
    `/reference/${referenceId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multireference/form-data',
      },
    },
  );

  return response.data;
};
