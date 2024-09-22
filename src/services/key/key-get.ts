import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Storage } from '../types';

type KeyGetRequest = {
  questionId: string;
};

type KeyGetResponse = GResponse<{
  id: string;
  questionId: string;
  optionId?: string;
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
