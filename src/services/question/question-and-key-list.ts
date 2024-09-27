import { MResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { QuestionAndKey } from '../types';

type QuestionAndKeyListRequest = {
  formId: string;
};

type QuestionAndKeyListResponse = MResponse<QuestionAndKey[]>;

export const questionAndKeyList = async ({
  formId,
}: QuestionAndKeyListRequest): Promise<QuestionAndKeyListResponse> => {
  const response = await axiosInstance.get<QuestionAndKeyListResponse>(
    `form/${formId}/question-and-key`,
  );
  return response.data;
};

export const questionAndKeyListKey = (req: QuestionAndKeyListRequest) => [
  'question-and-key-list',
  req,
];
