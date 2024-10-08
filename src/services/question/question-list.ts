import { MResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Storage } from '../types';

type QuestionListRequest = {
  formId: string;
};

type QuestionListResponse = MResponse<
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
    part?: {
      id: string;
      name?: string;
      order?: number;
    };
    options?: {
      id: string;
      text?: string;
    }[];
  }[]
>;

export const questionList = async ({
  formId,
}: QuestionListRequest): Promise<QuestionListResponse> => {
  const response = await axiosInstance.get<QuestionListResponse>(
    `form/${formId}/question`,
  );
  return response.data;
};

export const questionListKey = (req: QuestionListRequest) => [
  'question-list',
  req,
];
