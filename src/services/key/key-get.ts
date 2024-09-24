import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Option, Question } from '../types';

type KeyGetRequest = {
  questionId: string;
};

type KeyGetResponse = GResponse<{
  id: string;
  question: Question;
  option?: Option;
  explanation?: string;
}>;

export const keyGet = async ({
  questionId,
}: KeyGetRequest): Promise<KeyGetResponse> => {
  const response = await axiosInstance.get<KeyGetResponse>(
    `/question/${questionId}/key`,
  );
  return response.data;
};

export const keyGetKey = (req: KeyGetRequest) => ['key-get', req.questionId];
