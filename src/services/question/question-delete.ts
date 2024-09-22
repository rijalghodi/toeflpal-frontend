import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type QuestionDeleteRequest = {
  questionId: string;
};

type QuestionDeleteResponse = GResponse<{
  id: string;
}>;

export const questionDelete = async ({
  questionId,
}: QuestionDeleteRequest): Promise<QuestionDeleteResponse> => {
  const response = await axiosInstance.delete<QuestionDeleteResponse>(
    `/question/${questionId}`,
  );

  return response.data;
};
