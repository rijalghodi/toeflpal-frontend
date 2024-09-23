import { MResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Storage } from '../types';

type QuestionListInPartRequest = {
  formId: string;
  partId: string;
};

type QuestionListInPartResponse = MResponse<
  {
    id: string;
    text?: string;
    audio?: Storage;
    order: number;
    reference?: {
      id: string;
      name?: string;
      text?: string;
      audio?: Storage;
    };
    options?: {
      id: string;
      text?: string;
    }[];
  }[]
>;

export const questionListInPart = async ({
  formId,
  partId,
}: QuestionListInPartRequest): Promise<QuestionListInPartResponse> => {
  const response = await axiosInstance.get<QuestionListInPartResponse>(
    `form/${formId}/part/${partId}/question`,
  );
  return response.data;
};

export const questionListInPartKey = (req: QuestionListInPartRequest) => [
  'question-list-in-part',
  req,
];
