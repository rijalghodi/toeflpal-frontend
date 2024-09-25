import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Answer, Attempt } from '../types';

type AttemptFinsihRequest = {
  formId: string;
  answers: Answer[];
};

type AttemptFinsihResponse = GResponse<Attempt>;

export const attemptFinish = async ({
  formId,
}: AttemptFinsihRequest): Promise<AttemptFinsihResponse> => {
  const response = await axiosInstance.post<AttemptFinsihResponse>(
    `/form/${formId}/attempt/finsih`,
  );
  return response.data;
};
