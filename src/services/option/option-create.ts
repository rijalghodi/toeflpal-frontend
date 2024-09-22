import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type OptionCreateRequest = {
  text?: string;
  questionId: string;
};

type OptionCreateResponse = GResponse<{
  id: string;
}>;

export const optionCreate = async ({
  questionId,
  text,
}: OptionCreateRequest): Promise<OptionCreateResponse> => {
  const response = await axiosInstance.post<OptionCreateResponse>(
    `/question/${questionId}/option`,
    { text },
  );
  return response.data;
};
