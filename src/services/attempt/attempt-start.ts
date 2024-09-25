import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Attempt } from '../types';

type AttemptStartRequest = {
  formId: string;
};

type AttemptStartResponse = GResponse<Attempt>;

export const attemptStart = async ({
  formId,
}: AttemptStartRequest): Promise<AttemptStartResponse> => {
  const response = await axiosInstance.post<AttemptStartResponse>(
    `/form/${formId}/attempt/start`,
  );
  return response.data;
};
