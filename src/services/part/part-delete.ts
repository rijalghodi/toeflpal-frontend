import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type PartDeleteRequest = {
  formId: string;
  partId: string;
};

type PartDeleteResponse = GResponse<{
  id: string;
}>;

export const partDelete = async ({
  formId,
  partId,
}: PartDeleteRequest): Promise<PartDeleteResponse> => {
  const response = await axiosInstance.delete<PartDeleteResponse>(
    `/form/${formId}/part/${partId}`,
  );

  return response.data;
};
