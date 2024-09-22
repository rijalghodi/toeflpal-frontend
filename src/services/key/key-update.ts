import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type KeyUpdateRequest = {
  questionId: string;
  explanation?: string;
  optionId?: string;
};

type KeyUpdateResponse = GResponse<{
  id: string;
}>;

export const keyUpdate = async ({
  questionId,
  ...req
}: KeyUpdateRequest): Promise<KeyUpdateResponse> => {
  const response = await axiosInstance.patch<KeyUpdateResponse>(
    `/question/${questionId}/key`,
    req,
  );
  return response.data;
};
