import { MResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { QuestionAndKey } from '../types';

type QuestionAndKeyListInPartRequest = {
  formId: string;
  partId: string;
};

type QuestionAndKeyListInPartResponse = MResponse<QuestionAndKey[]>;

export const questionAndKeyListInPart = async ({
  formId,
  partId,
}: QuestionAndKeyListInPartRequest): Promise<QuestionAndKeyListInPartResponse> => {
  const response = await axiosInstance.get<QuestionAndKeyListInPartResponse>(
    `form/${formId}/part/${partId}/question-and-key`,
  );
  return response.data;
};

export const questionAndKeyListInPartKey = (
  req: QuestionAndKeyListInPartRequest,
) => ['question-and-key-list-in-part', req];
